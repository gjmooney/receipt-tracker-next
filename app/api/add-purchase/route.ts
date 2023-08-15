import { db } from "@/lib/db";
import { AddPurchaseValidator } from "@/lib/validators/addPurchaseVal";
import { AddReceiptTextValidator } from "@/lib/validators/addReceiptTextVal";
import { auth } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { date, receiptTexts, store } = AddPurchaseValidator.parse(body);

    // add store id and date to price entries
    // convert entered prices to cents for db
    const data = receiptTexts.map((entry) => ({
      ...entry,
      price: entry.price * 100,
      storeId: store,
      date: date,
    }));

    console.log("data", data);

    // create prices
    // this automatically connects the new price to existing products
    const createMany = await db.price.createMany({
      data,
    });

    return new Response(`${createMany.count}`, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("error.message", error.message);
      return new Response(error.message, { status: 422 });
    }

    console.log("error", error);
    return new Response("is Broke", { status: 500 });
  }
}

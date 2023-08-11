import { db } from "@/lib/db";
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

    console.log("body", body);
    //create purchase????

    // add store id to price entries
    const data = body.entries.map((entry: any) => ({
      ...entry,
      price: +entry.price,
      storeId: body.store,
    }));

    // create prices
    const createMany = await db.price.createMany({
      data,
    });

    // attach price to product

    /* // add product id to receipt texts
    const data = receiptTextValidated.receiptTexts.map((entry) => ({
      ...entry,
      productId: productId,
    })); */

    /* // create receipt texts
    const createMany = await db.receiptText.createMany({
      data,
      skipDuplicates: true,
    }); */

    return new Response(`${createMany.count}`, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    console.log("error", error);
    return new Response("is Broke", { status: 500 });
  }
}

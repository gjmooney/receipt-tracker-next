import { db } from "@/lib/db";
import { AddItemValidator } from "@/lib/validators/addItem";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    let { type } = AddItemValidator.parse(body);

    const produceExists = await db.produce.findUnique({
      where: { type },
    });

    if (produceExists) {
      return new Response("produce already exists", { status: 409 });
    } else {
      const produce = await db.produce.create({
        data: { type },
      });

      return new Response(produce.type);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    console.log("error", error);
    return new Response("is Broke", { status: 500 });
  }
}

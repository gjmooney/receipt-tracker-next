import { db } from "@/lib/db";
import { AddItemValidator } from "@/lib/validators/addItemForm";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    let { type, receiptText, store, variety } = AddItemValidator.parse(body);

    const produceExists = await db.produce.findUnique({
      where: { type },
    });

    if (produceExists) {
      console.log("produceExists", type, receiptText, store);
      return new Response("produce already exists", { status: 409 });
    } else {
      // first we create the produce item
      const produce = await db.produce.create({
        data: { type, variety },
      });

      // then we get the store id
      // (store is from a select component
      // so we know it exists)
      const storeId = await db.store.findFirst({
        where: { name: store },
      });
      console.log("storeId", storeId);

      // then we create the receiptText entry

      const receiptTextEntry = await db.receiptText.create({
        data: {
          text: receiptText,
          storeId: storeId!.id,
          produceId: produce.id,
        },
      });

      //then we update the produce item with the receipt text
      const updateProduce = await db.produce.update({
        where: { id: produce.id },
        data: {
          receiptText: {
            connect: {
              id: receiptTextEntry.id,
            },
          },
        },
      });

      return new Response(updateProduce.type);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    console.log("error", error);
    return new Response("is Broke", { status: 500 });
  }
}

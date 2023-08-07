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

    let {
      type,
      variety,
      category,
      upc,
      brand,
      weight,
      weightUnit,
      store,
      receiptText,
    } = AddItemValidator.parse(body);

    // return error if there's no UPC
    // do check here because it's not being enforced at form level
    // because of produce option
    if (!upc || !weight || !weightUnit) {
      return new Response("Value is required", { status: 400 });
    }

    // TODO change schema to type + variety (+ weight) is unique ?
    const productExists = await db.product.findUnique({
      where: {
        upc,
      },
    });

    if (productExists) {
      return new Response("Product already exists", { status: 409 });
    } else {
      //first create product
      const product = await db.product.create({
        data: {
          type,
          category,
          brand,
          upc,
          weight,
          weightUnit,
          variety,
        },
      });

      // then we get the store id
      // (store is from a select component
      // so we know it exists)
      const storeId = await db.store.findFirst({
        where: { name: store },
      });

      // then we create the receiptText entry

      const receiptTextEntry = await db.receiptText.create({
        data: {
          text: receiptText,
          storeId: storeId!.id,
          produceId: product.id,
        },
      });

      //then we update the product item with the receipt text
      const updateProduct = await db.product.update({
        where: { id: product.id },
        data: {
          receiptText: {
            connect: {
              id: receiptTextEntry.id,
            },
          },
        },
      });

      return new Response(updateProduct.type);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    console.log("error", error);
    return new Response("is Broke", { status: 500 });
  }
}

import { db } from "@/lib/db";
import { AddItemValidator } from "@/lib/validators/addItemForm";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

const PRODUCE = -1;

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    let { type, variety, isProduce, category, brand, weight, weightUnit, upc } =
      AddItemValidator.parse(body);

    /* return error if there's no UPC/weight/weight unit
     do check here because it's not being enforced at form level
     because of produce possibility */
    if (!isProduce && (!upc || !weight || !weightUnit)) {
      return new Response("Value is required", { status: 400 });
    }

    // items have unique UPC codes if they have one
    // if they don't, then the product is produce, and
    // variety + type should be unique
    // so if an item is produce we create it with the weight
    // set to -1 so it can be used in the schema.
    // variety + type + weight is also unique for non produce
    // items

    // set weight to -1 for produce items (no upc)
    if (!weight) {
      weight = PRODUCE;
    }

    const productExists = await db.product.findUnique({
      where: {
        variety_type_weight: {
          variety,
          type,
          weight,
        },
      },
    });

    //TODO if product exists and receipt text is different
    // we want to make a new receipt text

    if (productExists) {
      return new Response("Product already exists", { status: 409 });
    } else {
      //first create product
      const product = await db.product.create({
        data: {
          type,
          variety,
          category,
          brand,
          weight,
          weightUnit,
          upc,
        },
      });

      //TODO maybe need error handling for these other db calls
      // should separate them out

      // then we get the store id
      // (store is from a select component
      // so we know it exists)
      // TODO: need to check location as well
      /* const storeId = await db.store.findFirst({
        where: { name: store },
      }); */

      /*
      // then we create the receiptText entry
      const receiptTextEntry = await db.receiptText.create({
        data: {
          text: receiptText,
          storeId: storeId!.id,
          productId: product.id,
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
      */

      return new Response(product.type);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("is Broke", { status: 500 });
  }
}

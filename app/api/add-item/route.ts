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

    let {
      type,
      subtype,
      microtype,
      description,
      category,
      upc,
      brand,
      isProduce,
    } = AddItemValidator.parse(body);

    // set UPC if product is produce
    // doing this because upc is used as part of identifier
    if (isProduce) {
      upc = "produce";
    }

    // return error if product is not produce
    // and there's no UPC
    if (!upc) {
      return new Response("UPC is required", { status: 400 });
    }

    const productExists = await db.product.findUnique({
      where: {
        type_upc: { type, upc },
      },
    });

    if (productExists) {
      return new Response("Product already exists", { status: 409 });
    } else {
      const product = await db.product.create({
        data: {
          type,
          subtype,
          microtype,
          description,
          category,
          brand,
          upc,
          isProduce,
        },
      });

      return new Response(product.type);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    console.log("error", error);
    return new Response("is Broke", { status: 500 });
  }
}

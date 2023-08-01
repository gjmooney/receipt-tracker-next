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

    const { type, subtype, microtype, description, category, upc, brand } =
      AddItemValidator.parse(body);

    // need all the fields from the submission
    //submit the right fields to the right tables
    //purchase will always be a new row
    // product might just be an update to the purchase column

    //so first: check if product already exists
    //TODO: gonna use type for now

    const productExists = await db.product.findFirst({
      where: {
        upc,
      },
    });

    if (productExists) {
      return new Response("Product already exists", { status: 409 });
    } else {
      //create product

      const product = await db.product.create({
        data: {
          type: type,
          subtype: subtype,
          microtype: microtype,
          description: description,
          category: category,
          brand: brand,
          upc: upc,
        },
      });

      return new Response(product.type);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("is Broke", { status: 500 });
  }
}

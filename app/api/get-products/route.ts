import { db } from "@/lib/db";

export async function GET(req: Request) {
  const products = await db.product.findMany();

  return new Response(products);
}

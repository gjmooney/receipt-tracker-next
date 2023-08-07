import ProductList from "@/components/ProductList";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const products = await db.product.findMany();

  return (
    <main className="flex flex-col gap-4">
      <p>this is the home page woooo</p>
    </main>
  );
};

export default page;

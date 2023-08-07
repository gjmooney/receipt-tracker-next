import ProductList from "@/components/ProductList";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const products = await db.product.findMany({});
  console.log("products", products);
  //TODO pagination and scrolling

  return (
    <div className="flex flex-col gap-4">
      <Link href="/add-item" className={buttonVariants()}>
        Add New Item
      </Link>
      <ProductList products={products} />
    </div>
  );
};

export default page;

import ProductList from "@/components/ProductList";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const products = await db.product.findMany();

  return (
    <div className="">
      <div>
        <Link href="/add-item" className={buttonVariants()}>
          Add New Item
        </Link>
      </div>
      <div className="">list of items</div>
      <ProductList products={products} />
    </div>
  );
};

export default page;

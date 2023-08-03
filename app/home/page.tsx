import ProductList from "@/components/ProductList";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const products = await db.product.findMany();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link href="/add-item" className={buttonVariants()}>
          Add New Item
        </Link>
      </div>
      {products.length !== 0 ? (
        <ProductList products={products} />
      ) : (
        <div>Add an item to get started</div>
      )}
    </div>
  );
};

export default page;

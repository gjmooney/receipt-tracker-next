import ProductList from "@/components/ProductList";
import { db } from "@/lib/db";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const products = await db.product.findMany({});
  console.log("products", products);
  //TODO pagination and scrolling

  return <ProductList products={products} />;
};

export default page;

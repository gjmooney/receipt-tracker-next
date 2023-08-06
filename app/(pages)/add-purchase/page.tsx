import AddPurchaseForm from "@/components/forms/AddPurchaseForm";
import { db } from "@/lib/db";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const products = await db.product.findMany({
    select: {
      type: true,
    },
  });
  const produce = await db.produce.findMany({
    select: {
      type: true,
    },
  });

  const arr = [...products, ...produce];
  //console.log("products", arr);
  //console.log("produce", produce);

  return <AddPurchaseForm />;
};

export default page;

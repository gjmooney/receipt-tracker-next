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

  const stores = await db.store.findMany();
  const receiptTexts = await db.receiptText.findMany();

  const arr = [...products];
  //console.log("products", arr);
  //console.log("produce", produce);

  return <AddPurchaseForm stores={stores} receiptTexts={receiptTexts} />;
};

export default page;

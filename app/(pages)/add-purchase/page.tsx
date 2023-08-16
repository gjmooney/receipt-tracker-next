import AddPurchaseForm from "@/components/forms/AddPurchaseForm";
import { db } from "@/lib/db";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const stores = await db.store.findMany();
  const receiptTexts = await db.receiptText.findMany({
    orderBy: { text: "asc" },
  });

  return <AddPurchaseForm stores={stores} receiptTexts={receiptTexts} />;
};

export default page;

import { db } from "@/lib/db";
import { FC } from "react";

interface getReceiptTextProps {
  storeId: string;
}

const getReceiptText = async ({ storeId }: getReceiptTextProps) => {
  const receiptText = await db.receiptText.findMany({
    where: { storeId },
  });

  console.log("receiptText", receiptText);
  //return receiptText;
};

export default getReceiptText;

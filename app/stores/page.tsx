import StoreList from "@/components/StoreList";
import { db } from "@/lib/db";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const stores = await db.store.findMany({});

  return <StoreList data={stores} />;
};

export default page;

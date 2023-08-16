import { Store } from "@prisma/client";
import { FC } from "react";
import StoreCard from "./StoreCard";

interface StoreListProps {
  data: Store[];
}

const StoreList: FC<StoreListProps> = async ({ data }) => {
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-12">
      {data.map((item) => (
        <StoreCard key={item.id} store={item} />
      ))}
    </div>
  );
};

export default StoreList;

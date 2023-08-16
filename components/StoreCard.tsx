import { Store } from "@prisma/client";
import { formatDistance } from "date-fns";
import { FC } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StoreCardProps {
  store: Store;
}

type Address = {
  number: string;
  street: string;
  city: string;
  zipCode: string;
};

const StoreCard: FC<StoreCardProps> = ({ store }) => {
  //Type JSON from DB
  const address = store.address as Address;

  //TODO make click goto google maps?
  return (
    <Card className="flex flex-col justify-evenly bg-slate-100 text-slate-700 md:col-span-6 ">
      <CardHeader>
        <CardTitle className="capitalize">{store.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="rounded-md border border-slate-700 p-4">
          <p>
            {address.number} {address.street}
          </p>
          <p className="text-sm text-muted-foreground">
            {address.city}, {address.zipCode}
          </p>
        </div>

        <div className="flex justify-between gap-4 ">
          <Button className="basis-1/3">Edit</Button>
          <Button className="basis-2/12" variant={"destructive"}>
            Delete
          </Button>
          <div className="hidden basis-1/3 space-y-1 md:block">
            <p className="text-sm font-medium leading-none">Last updated:</p>
            <p className="text-sm text-muted-foreground">
              {formatDistance(store.updatedAt, new Date(), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreCard;

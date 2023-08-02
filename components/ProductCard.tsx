import { toTitleCase } from "@/utils/utils";
import { Product } from "@prisma/client";
import { formatDistance } from "date-fns";
import { FC } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ProductCardProps {
  data: Product;
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  return (
    <Card className="flex flex-col justify-evenly bg-slate-100 text-slate-700 md:col-span-6 ">
      <CardHeader>
        <CardTitle>{toTitleCase(data.type)}</CardTitle>
        <CardDescription>
          {data.isProduce ? "Produce" : `${data.subtype} ${data.microtype}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <div className=" col-span-full items-center space-x-4 rounded-md border border-slate-700 p-4">
          description
        </div>

        <div className="flex justify-between py-6 text-sm text-muted-foreground">
          <div className="grid grid-cols-[12px_1fr] items-start justify-center ">
            <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-cyan-700" />
            {data.category}
          </div>

          <div className="grid grid-cols-[12px_1fr] items-start justify-center ">
            <span className="bg- flex h-2 w-2 translate-y-1.5 rounded-full" />
            Purchased {data.timesPurchased} times
          </div>
        </div>

        {/* <div className="">edit delete time purchased</div> */}
        <div className="flex justify-between gap-4">
          <Button className="basis-1/3">Edit</Button>
          <Button className="basis-2/12" variant={"destructive"}>
            Delete
          </Button>
          <div className="hidden basis-1/3 space-y-1 md:block">
            <p className="text-sm font-medium leading-none">Last updated at:</p>
            <p className="text-sm text-muted-foreground">
              {formatDistance(data.updatedAt, new Date(), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

import { Product } from "@prisma/client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toTitleCase } from "@/utils/utils";
import { format, formatDistance } from "date-fns";
import { Button } from "./ui/button";

interface ProductCardProps {
  data: Product;
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  return (
    <Card className="col-span-6 flex flex-col justify-evenly bg-slate-100 text-slate-700">
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

        <div className=" flex justify-between py-6 text-sm text-muted-foreground">
          <span>{data.category}</span>
          <span>Purchased {data.timesPurchased} times</span>
        </div>

        {/* <div className="">edit delete time purchased</div> */}
        <div className="flex justify-between gap-4">
          <Button className="basis-1/3">Edit</Button>
          <Button className="basis-2/12" variant={"destructive"}>
            Delete
          </Button>
          <div className=" basis-1/3 space-y-1">
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

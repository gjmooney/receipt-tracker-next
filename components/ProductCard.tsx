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
import { format } from "date-fns";
import { Button } from "./ui/button";

interface ProductCardProps {
  data: Product;
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle>{toTitleCase(data.type)}</CardTitle>
        <CardDescription>
          {data.isProduce ? "Produce" : `${data.subtype} ${data.microtype}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-6 gap-4">
        <div className=" col-span-full items-center space-x-4 rounded-md border p-4">
          description
        </div>

        <div className="col-span-full flex justify-between text-sm text-muted-foreground">
          <span>{data.category}</span>
          <span>Purchased {data.timesPurchased} times</span>
        </div>

        {/* <div className="">edit delete time purchased</div> */}
        <Button className="col-span-2">Edit</Button>
        <Button className="col-span-2">Delete</Button>
        <span className="col-span-2">last updated</span>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

import { Product } from "@prisma/client";
import { format, formatDistance } from "date-fns";
import { FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = async ({ product }) => {
  //console.log("product", product);

  const priceInfo = await db.price.findFirst({
    where: {
      productId: product.id,
    },
    select: {
      price: true,
      date: true,
      fromStore: {
        select: {
          name: true,
          location: true,
        },
      },
    },
    orderBy: {
      price: "asc",
    },
  });

  return (
    <Card className="flex flex-col justify-evenly bg-slate-100 text-slate-700 md:col-span-6 ">
      <CardHeader className="w-fit">
        <CardTitle className="capitalize">
          {product.variety} {product.type}
        </CardTitle>
        <CardDescription className="">
          <span className="lowercase">
            {product.weight}
            {product.weightUnit}{" "}
            <div className="inline-block capitalize"> {product.category}</div>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <div className=" col-span-full items-center space-x-4 rounded-md border border-slate-700 p-4">
          <p className="font-semibold">Lowest Price:</p>
          {priceInfo ? (
            <>
              <span className="font-semibold">
                ${priceInfo?.price.toString()}
              </span>
              <span className="text-muted-foreground">from</span>
              <span className="inline-block font-semibold capitalize">
                {/** link to store detail */}
                {priceInfo?.fromStore.name}
              </span>
              <span className="text-muted-foreground">on</span>
              <span className="font-semibold">
                {format(priceInfo.date, "d MMM yyyy")}
              </span>
            </>
          ) : (
            <span>No purchases yet</span>
          )}
        </div>

        <div className="flex justify-between py-6 text-sm ">
          <div className="grid grid-cols-[12px_1fr] items-start justify-center capitalize text-muted-foreground">
            <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-cyan-700 " />
            {/** TODO add times purchased to schema */}
            Purchased 10 times
          </div>

          <div className="hidden basis-1/3 space-y-1 md:block">
            <p className="text-sm font-medium  leading-none">Last updated:</p>
            <p className="text-sm text-muted-foreground">
              {formatDistance(product.updatedAt, new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <Link
            href={`/edit-item/${product.id}`}
            className={cn(buttonVariants(), "basis-1/3")}
          >
            Edit
          </Link>
          <Button className="basis-2/12" variant={"destructive"}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

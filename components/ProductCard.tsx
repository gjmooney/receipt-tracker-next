import { Price, Product } from "@prisma/client";
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
  product: Product & { _count: { Price: number } };
}

const PRODUCE = -1;
const ERROR = -2;

const findPricePerThousand = (
  price: number,
  weight: number,
  weightUnit: string,
): number => {
  // divide price by 100 to convert pennies -> dollars
  if (weight == PRODUCE) {
    return price / 100;
  }
  const pricePerUnit = price / 100 / weight;

  console.log("weightUnit", weightUnit);
  switch (weightUnit) {
    case "KG" || "L":
      return price / 100;
    case "G" || "ML":
      return pricePerUnit * 1000;
    case "CL":
      return pricePerUnit * 100;
    default:
      return ERROR;
  }
};

const ProductCard: FC<ProductCardProps> = async ({ product }) => {
  //console.log("product", product._count.Price);

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

  const pricePerKilo = findPricePerThousand(
    priceInfo!.price,
    product.weight,
    product.weightUnit!,
  );

  return (
    <Card className="flex flex-col justify-evenly bg-slate-100 text-slate-700 md:col-span-6 ">
      <CardHeader className="w-fit">
        <CardTitle className="capitalize">
          {product.variety} {product.type}
        </CardTitle>
        <CardDescription className="">
          <span className="lowercase">
            {product.weight === -1 ? (
              <></>
            ) : (
              <>
                {product.weight}
                {product.weightUnit}{" "}
              </>
            )}
            <div className="inline-block capitalize"> {product.category}</div>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <div className="col-span-full items-center rounded-md border border-slate-700 p-4">
          <p className="font-semibold">Lowest Price:</p>
          {priceInfo ? (
            <div className="mt-2 font-semibold">
              {/** undefined uses system locale */}
              {new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "EUR",
              }).format(priceInfo.price / 100)}
              <span className="font-normal text-muted-foreground"> from </span>
              <span className="inline-block capitalize">
                {/** link to store detail */}
                {priceInfo?.fromStore.name}
                <span className="font-normal text-muted-foreground">
                  -{priceInfo.fromStore.location}{" "}
                </span>
              </span>
              <span className="text-sm">
                <span className="font-normal text-muted-foreground"> on </span>
                {format(priceInfo.date, "d MMM yyyy")}
              </span>
              <br />
              {pricePerKilo !== ERROR ? (
                <span>
                  Price per kilo:{" "}
                  {new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: "EUR",
                  }).format(pricePerKilo)}
                </span>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className="mt-2">No purchases yet</div>
          )}
        </div>

        <div className="flex justify-between py-6 text-sm ">
          <div className="grid grid-cols-[12px_1fr] items-start justify-center capitalize text-muted-foreground">
            <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-cyan-700 " />
            {/** TODO add times purchased to schema */}
            Purchased {product._count.Price} times
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
            className={cn(buttonVariants(), "w-fit")}
          >
            Add Receipt Text
          </Link>
          <Button className="basis-1/3" variant={"destructive"}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

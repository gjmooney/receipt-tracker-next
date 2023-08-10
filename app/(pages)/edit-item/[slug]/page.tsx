import ProductCard from "@/components/ProductCard";
import ReceiptTextForm from "@/components/forms/ReceiptTextForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { slug } = params;
  const { userId } = auth();

  // not auth -> redirect to login
  if (!userId) {
    redirect("/sign-in");
  }

  console.log("slug", slug);

  const product = await db.product.findUnique({
    where: {
      id: slug,
    },
  });

  const stores = await db.store.findMany();

  console.log("product", product);

  return (
    <div>
      {product ? (
        <>
          <ProductCard data={product} />
          <ReceiptTextForm stores={stores} />
        </>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
};

export default page;

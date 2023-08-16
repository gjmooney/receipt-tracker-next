import ReceiptTextForm from "@/components/forms/ReceiptTextForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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

  if (!userId) {
    redirect("/sign-in");
  }

  const product = await db.product.findUnique({
    where: {
      id: slug,
    },
  });

  const stores = await db.store.findMany();

  return (
    <div>
      {product ? (
        <div>
          <p className="mb-6 text-center text-4xl  font-semibold capitalize tracking-tight">
            {product.variety} {product.type}
          </p>

          <ReceiptTextForm stores={stores} productId={slug} />
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
};

export default page;

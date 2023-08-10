import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  const { slug } = params;
  const { userId } = auth();

  // not auth -> redirect to login
  if (!userId) {
    redirect("/sign-in");
  }

  const product = db.product.findUnique({
    where: {
      id: slug,
    },
  });

  return <div>page {slug}</div>;
};

export default page;

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Link href="/add-purchase" className={buttonVariants()}>
        Add purchase
      </Link>
      purchases
    </div>
  );
};

export default page;

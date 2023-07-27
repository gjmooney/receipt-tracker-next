import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="">
      <div>
        <Link href="/add-item" className={buttonVariants()}>
          Add New Item
        </Link>
      </div>
      <div className="">list of items</div>
    </div>
  );
};

export default page;

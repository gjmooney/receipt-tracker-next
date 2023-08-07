import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/add-purchase" className={buttonVariants()}>
        Add purchase
      </Link>
    </div>
  );
};

export default page;

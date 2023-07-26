import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-b border-slate-100 bg-slate-300 py-2">
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-2">
        <Link href="/" className="flex  items-center gap-2">
          <div className="relative mr-4 h-8 w-8 sm:h-6 sm:w-6">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <p className="hidden text-sm font-medium text-slate-700 md:block">
            Receipt Tracker
          </p>
        </Link>

        {/** TODO: Search bar */}

        <Link href="/sign-in" className={buttonVariants()}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

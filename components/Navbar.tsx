import { UserButton, auth, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { userId } = auth();

  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-b  bg-slate-300 py-2 dark:bg-slate-900">
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-8 w-8 sm:h-6 sm:w-6">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <p className="hidden text-sm font-bold md:block">TRCKR</p>
        </Link>

        <Link href="/products" className="text-sm font-bold ">
          Products
        </Link>
        <Link href="/purchases" className="text-sm font-bold ">
          Purchases
        </Link>
        <Link href="/stores" className="text-sm font-bold ">
          Stores
        </Link>

        {/** TODO: Search bar */}

        <div className="flex items-center gap-4">
          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className={buttonVariants()}>Sign In</button>
            </SignInButton>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

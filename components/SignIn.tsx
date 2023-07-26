import Image from "next/image";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[300px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="relative mx-auto h-6 w-6">
          <Image src="/logo.png" alt="logo" fill />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back!</h1>
        <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up a Tracker account nad agree to our
          User Agreement and Privacy Policy
        </p>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-slate-700">
          New to <b>TRCKR</b>?{" "}
          <Link
            href="/sign-up"
            className="text-sm underline underline-offset-4 hover:text-slate-800"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

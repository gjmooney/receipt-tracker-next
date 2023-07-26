"use client";

import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { Icons } from "./IconsSvg";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface UserAuthFormProps {}

const UserAuthForm: FC<UserAuthFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      // TODO: toast
      toast({
        title: "There was a problem",
        description: "There was a problem logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size={"sm"}
        className="w-full"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;

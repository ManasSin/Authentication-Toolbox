"use client";

import { FC } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle, FaGithub } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface SocialProps {}

const Social: FC<SocialProps> = ({}) => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      {/* <Button variant="outline" size="lg" className="w-full" onClick={() => {}}>
        <FcGoogle className="h-5 w-5" />
      </Button> */}

      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;

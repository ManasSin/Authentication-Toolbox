"use client";

import { FC } from "react";

import { FcGoogle, FaGithub } from "@/components/Icons";
import { Button } from "@/components/ui/button";

interface SocialProps {}

const Social: FC<SocialProps> = ({}) => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button variant="outline" size="lg" className="w-full" onClick={() => {}}>
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button variant="outline" size="lg" className="w-full" onClick={() => {}}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;

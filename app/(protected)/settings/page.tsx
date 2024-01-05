import { FC } from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await auth();
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="default">Sign out</Button>
      </form>
      {JSON.stringify(session)}
    </div>
  );
};

export default page;

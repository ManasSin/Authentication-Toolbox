import { FC } from "react";
import { auth } from "@/auth";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
};

export default page;

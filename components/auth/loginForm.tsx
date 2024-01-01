import { FC } from "react";
import CardWrapper from "@/components/auth/CardWrapper";

interface loginformProps {}

const Loginform: FC<loginformProps> = ({}) => {
  return (
    <CardWrapper
      headerlabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      TODO: Login Form
    </CardWrapper>
  );
};

export default Loginform;

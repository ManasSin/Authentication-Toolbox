import { FC } from "react";

import CardWrapper from "./CardWrapper";
import { ExclamationTriangleIcon } from "@/components/Icons";

interface ErrorCardsProps {}

const ErrorCards: FC<ErrorCardsProps> = ({}) => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerlabel="Oops! something went wrong!"
      headerText="🔐 Auth"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCards;

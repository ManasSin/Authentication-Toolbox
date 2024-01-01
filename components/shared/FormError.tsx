import { FC } from "react";

import { ExclamationTriangleIcon } from "@/components/Icons";

interface FormErrorProps {
  message?: string;
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 text-destructive flex items-center gap-x-2 text-sm rounded-md">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;

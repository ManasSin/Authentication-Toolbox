import { FC } from "react";

import { CheckCircledIcon } from "@/components/Icons";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess: FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 text-emerald-500 flex items-center gap-x-2 text-sm rounded-md">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;

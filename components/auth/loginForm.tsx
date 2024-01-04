"use client";

import { FC, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import CardWrapper from "@/components/auth/CardWrapper";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/shared/FormError";
import FormSuccess from "@/components/shared/FormSuccess";
import { login } from "@/actions/login";
import { TLoginSchema } from "@/types/schemaTypes";
import { EyeClosedIcon, EyeOpenIcon } from "@/components/Icons";

interface loginformProps {}

const Loginform: FC<loginformProps> = ({}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TLoginSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  const toggleShowPassword = () => {
    // e.preventDefault();
    setShowPassword(!showPassword);
  };
  const passwordFieldType = showPassword === true ? "text" : "password";

  return (
    <CardWrapper
      headerlabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      headerText="🔐 Auth"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@email.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="********"
                        type={passwordFieldType}
                        disabled={isPending}
                      />
                      {/* {passwordFieldType === "password" && ( */}
                      <div
                        onClick={toggleShowPassword}
                        className="absolute right-2 top-0 cursor-pointer h-full py-2"
                      >
                        {showPassword ? (
                          <EyeOpenIcon className="w-5 h-5" />
                        ) : (
                          <EyeClosedIcon className="w-5 h-5" />
                        )}
                      </div>
                      {/* )} */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default Loginform;

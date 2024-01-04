"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import CardWrapper from "@/components/auth/CardWrapper";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";
import { TRegisterSchema } from "@/types/schemaTypes";
import { EyeOpenIcon, EyeClosedIcon } from "@/components/Icons";

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: TRegisterSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
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
      headerlabel="Create an Account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/register"
      headerText="🔐 Auth"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john doe"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          <Button type="submit" className="w-full" disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;

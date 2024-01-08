"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/getUsers";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { TLoginSchema } from "@/types/schemaTypes";
import { AuthError } from "next-auth";
// learn about progresive inhancement in server action, for login.

export const login = async (values: TLoginSchema) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: "Invalid fields",
    };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Email does not exists!" };

  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    return { success: "Confirmation Email sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};

"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { TRegisterSchema } from "@/types/schemaTypes";
import { getUserByEmail } from "@/lib/getUsers";
import { generateVerificationToken } from "@/lib/token";
// learn about progresive inhancement in server action, for register.

export const register = async (values: TRegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: "Invalid fields",
    };

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already taken" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  // TODO: Send verification token email

  return { success: "Confirmation email sent!" };
};

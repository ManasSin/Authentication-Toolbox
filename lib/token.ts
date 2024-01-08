import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuid } from "uuid";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verification.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verification.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

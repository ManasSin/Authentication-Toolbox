import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";

export type TLoginSchema = z.infer<typeof LoginSchema>;
export type TRegisterSchema = z.infer<typeof RegisterSchema>;

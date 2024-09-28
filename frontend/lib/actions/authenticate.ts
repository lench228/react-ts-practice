"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

async function authenticate(
  prevState: string | undefined,
  formData: FormData | undefined
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "wrong password or email";
        default:
          return "error";
      }
    }
  }
}

export default authenticate;

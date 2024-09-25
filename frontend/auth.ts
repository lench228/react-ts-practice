import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";

type User = {
    email: string;
    hashpas: string; 
}

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = users
    }
}


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);


      },
    }),
  ],
});

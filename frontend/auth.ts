import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials"; // Исправлено имя на CredentialsProvider
import { z } from "zod";
import { User } from "./lib/definitions/definitions";
async function getUser(email: string): Promise<User | undefined> {
  try {
    const users: User[] = await fetch("https://fakestoreapi.com/users").then(
      (res) => res.json()
    );

    const user = users.find((user: User) => email === user.username);
    console.log(user);
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;
        try {
          const user = await getUser(email);
          if (!user) return null;

          const passwordMatch = user.password === password;

          if (passwordMatch) return user as any;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
});

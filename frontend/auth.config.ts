import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnProfile = nextUrl.pathname.startsWith("/profile");
        const isLoginPage = nextUrl.pathname === "/login";
        const isHomePage = nextUrl.pathname === "/";

        if (isOnProfile) {
          return isLoggedIn ? true : false; 
        }

        if (isLoginPage && isLoggedIn) {
          return Response.redirect(new URL("/profile", nextUrl));
        }

        if (isHomePage || !isOnProfile) {
          return true;
        }

        return false; 
    },
  },
  providers: [],
} satisfies NextAuthConfig;

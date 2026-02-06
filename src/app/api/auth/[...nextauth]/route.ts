// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    token: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: "RefreshAccessTokenError";
  }
}

import { loginApi, refreshTokenApi } from "@/features/auth/api/login.api";
import { JWT } from "next-auth/jwt";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const data = await refreshTokenApi(token.refreshToken);

    console.log("Refresh token response:", data);

    return {
      ...token,
      accessToken: data.data.accessToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // Assume 1 hour for now
      refreshToken: data.data.refreshToken || token.refreshToken, // Fallback to old if new not provided
    };
  } catch (error) {
    console.error("RefreshAccessTokenError", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const data = await loginApi({
            email: credentials.email,
            password: credentials.password,
          });

          console.log("API Login Response:", JSON.stringify(data, null, 2));

          const user = data.data?.user;
          const accessToken = data.data?.accessToken;
          const refreshToken = data.data?.refreshToken;

          console.log("User details:", user);
          console.log("Token:", accessToken);

          if (!user || !accessToken) {
            throw new Error("Invalid response from server");
          }

          // Return the object that NextAuth will use as 'user' in the jwt callback
          return {
            id: user?.id,
            name: `${user?.firstName} ${user?.lastName}`.trim(),
            email: user?.email,
            image: user?.avatar, // Map avatar to image
            role: user?.role,
            token: accessToken, // We attach the token here as a property of the user
            refreshToken: refreshToken as string,
          };
        } catch (error: unknown) {
          console.error("Authorize error:", error);
          const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || (error as Error).message || "Invalid email or password";
          throw new Error(errorMessage);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        console.log("JWT callback - Initial Sign In - User:", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour expiry
      }

      // Update session trigger
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token) {
        console.log("Session callback - Token:", token);
        session.user = {
          ...session.user,
          id: token?.id,
          name: token?.name,
          email: token?.email,
          image: token?.image,
          role: token?.role,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        // Use a more standard way to pass the error if possible, or keep it safe
        (session as { error?: string }).error = token.error;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

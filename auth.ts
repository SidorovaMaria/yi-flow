import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { api } from "./lib/api";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./lib/validation/validation";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const { data: existingAccount } = await api.accounts.getByProvider(email);

          if (!existingAccount) return null;

          const { data: existingUser } = await api.users.getById(
            existingAccount.userId.toString()
          );

          if (!existingUser) return null;

          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password!
          );
          console.log("Is valid password:", isValidPassword, existingAccount);
          if (isValidPassword) {
            return {
              id: existingUser.id,
              name: existingUser.username,

              email: existingUser.email,
              image: existingUser.image,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } = await api.accounts.getByProvider(
          account.type === "credentials" ? token.email! : account.providerAccountId
        );

        if (!success || !existingAccount) return token;

        const userId = existingAccount.userId;
        const username = existingAccount.username;
        if (userId) token.sub = userId.toString();
        if (username) token.name = username;
      }

      return token;
    },
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const userInfo = {
        email: user.email!,
        image: user.image!,
        username: profile?.name || user.name || "user",
      };

      const { success } = await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as "google",
        providerAccountId: account.providerAccountId,
      });

      if (!success) return false;

      return true;
    },
  },
});

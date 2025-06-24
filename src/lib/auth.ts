import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../prisma/prisma-client";
import { compare, hashSync } from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GitHubClientId || "",
      clientSecret: process.env.GitHubSecretId || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          createdAT: profile.createdAT,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;
        if (!user.password) return null;
        const validPassword = await compare(
          credentials.password,
          user.password
        );
        if (!validPassword) {
          return null;
        }
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullname,
          createdAT: user.createdAT,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, user }: { account: any; user: any }) {
      try {
        if (account?.provider === "credentials") return true;
        if (!user.email) return false;

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: user?.email },
            ],
          },
        });
        if (findUser) {
          await prisma.user.update({
            where: { id: Number(findUser.id) },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
        }
        await prisma.user.create({
          data: {
            email: user?.email,
            fullname: user?.name || "User #" + user.id,
            password: hashSync(user.id.toString(), 10),
            provider: account?.provider,
            providerId: account?.providerAccountId,
            createdAT: new Date(),
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token }: { token: any }) {
      if (!token.email) return token;
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullname;
        token.createdAT = findUser.createdAT;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any; user: any }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
        session.user.fullName = token.fullname;
        session.user.createdAT = token.createdAT;
      }
      return session;
    },
  },
};

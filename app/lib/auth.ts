import type { Prisma } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import Github from 'next-auth/providers/github';
import prisma from '../db';

export const NEXT_AUTH: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      if (!profile) {
        return false;
      }
      // @ts-expect-error unknown-type
      const username = profile.login;
      try {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          const user = await tx.participant.findFirst({
            where: {
              username: username,
            },
          });

          // Account does not exist or banned account
          if (!user || user.accountActive === false) {
            return false;
          }

          // Add provider ID
          if (!user.providerId) {
            await tx.participant.update({
              data: {
                // @ts-expect-error unknown-type
                providerId: profile.id.toString(),
              },
              where: {
                username: username,
              },
            });
          }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session?.user) {
        try {
          const user = await prisma.participant.findFirst({
            select: {
              username: true,
            },
            where: {
              providerId: token.sub,
            },
          });
          session.user.name = user?.username;
          return session;
        } catch (error) {
          console.log(error);
          return session;
        }
      }
      return session;
    },
  },
};

// TODO: Add Rate Limit to the login endpoint

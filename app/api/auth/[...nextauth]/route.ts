import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { db } from '@/db';
import cookieCutter from 'cookie-cutter';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (response !== null) {
          const passwordCorrect = await compare(
            credentials?.password || '',
            response.password,
          );

          console.log({ passwordCorrect });

          if (passwordCorrect) {
            return {
              id: response.id,
              email: response.email,
              user: response,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id; // Add user.id to the session
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

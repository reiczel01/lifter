import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { db } from '@/db';

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
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        console.log('user', user);
        if (!user) return null; // User not found

        const passwordCorrect = await compare(
          credentials?.password || '',
          user.password,
        );

        if (!passwordCorrect) return null; // Incorrect password

        return user; // Return the entire user object with id and email
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

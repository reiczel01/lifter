import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { db } from '@/db';

import { cookies } from 'next/headers';
import { json } from 'node:stream/consumers';
interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  licenceNumber?: string | null;
  peselNumber?: number | null;
  permissionsValidityDate?: Date | null;
  role?: string | null;
}

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
        const response: User | null = await db.user.findUnique({
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            password: true,
            licenceNumber: true,
            peselNumber: true,
            permissionsValidityDate: true,
            role: true,
            permissions: {
              select: {
                id: true,
              },
            },
          },
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
          const { password, ...responseWithoutPassword } = response;
          if (passwordCorrect) {
            cookies().set(
              'user-data',
              JSON.stringify(responseWithoutPassword),
              {
                path: '/',
                httpOnly: true,
                secure: false,
              },
            );
            return response;
          }
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };

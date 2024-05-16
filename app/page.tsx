import Image from 'next/image';
import { Button } from '@nextui-org/button';
import LogIn from '@/components/LogIn';
import Register from '@/components/Register';
import EquipmentRegistration from '@/components/EquipmentRegistration';
import EquipmentCard from '@/components/EquipmentCard';
import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import handler from '@/app/api/auth/[...nextauth]/JWT/handler';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;
export default async function Home() {
  const session = await getServerSession();
  console.log('session', session);

  return (
    <main className='flex flex-col items-center'>
      <LogIn />
    </main>
  );
}

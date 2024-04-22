import Image from 'next/image';
import { Button } from '@nextui-org/button';
import LogIn from '@/components/LogIn';
import Register from '@/components/Register';
import EquipmentRegistration from '@/components/EquipmentRegistration';
import EquipmentCard from '@/components/EquipmentCard';
import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();
  const allUsers = await prisma.equipment.findMany();
  console.log(allUsers.map((user) => user.model)); // Wypisze modele wszystkich sprzętów

  return (
    <main className='flex flex-col items-center'>
      <LogIn />
      <Register />
      <EquipmentRegistration />
    </main>
  );
}

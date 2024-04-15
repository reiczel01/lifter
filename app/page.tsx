import Image from 'next/image';
import { Button } from '@nextui-org/button';
import LogIn from '@/components/LogIn';
import Register from '@/components/Register';
import EquipmentRegistration from '@/components/EquipmentRegistration';

export default function Home() {
  return (
    <main className='flex flex-col items-center'>
      <div className=''>
        <LogIn />
      </div>
      <div>
        <Register />
      </div>
      <div>
        <EquipmentRegistration />
      </div>
    </main>
  );
}

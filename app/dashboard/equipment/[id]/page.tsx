import { notFound } from 'next/navigation';
import { db } from '@/db';
import { Divider } from '@nextui-org/react';
import Barcode from '@/components/barcode';

interface EquipmentPageProps {
  params: {
    id: string;
  };
}
export default async function EquipmentPage(props: EquipmentPageProps) {
  const equipment = await db.equipment.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!equipment) {
    return notFound();
  }
  return (
    <main className='flex flex-col'>
      <div className='mx-6 mt-4 items-center'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-4'>
          <div className='w-full max-w-[1/3] rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100'>
            <p className='font-bold uppercase'>model:</p>
            <a className='text-xl'> {equipment.model} </a>
            <Divider className='my-4' />
            <p className='font-bold uppercase'>serial Number:</p>
            <div className='flex flex-row items-center justify-between'>
              <a className='text-xl'>{equipment.serialNumber}</a>
              <Barcode value={equipment.serialNumber} height={50} />
            </div>
            <Divider className='my-4' />
            <p className='font-bold uppercase'>registration Number:</p>
            <div className='flex flex-row items-center justify-between'>
              <a className='text-xl'>{equipment.registrationNumber}</a>
              <Barcode value={equipment.registrationNumber} height={50} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

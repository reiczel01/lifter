import React from 'react';
import EquipmentCard from '@/components/EquipmentCard';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function searchEquipment(formData: FormData) {
  'use server';

  const searchQuery = formData.get('searchQuery')?.toString(); // Pobranie z formularza wartości wyszukiwania

  if (searchQuery) {
    redirect('/dashboard/searchEquipment?query=' + searchQuery); // Przekierowanie na stronę wyszukiwania z danym zapytaniem
  }
}

export default async function Dashboard() {
  const session = await getServerSession();
  console.log('session', session);
  const allEquipment = await db.equipment.findMany({
    include: {
      fault: {
        orderBy: { id: 'desc' },
        take: 1,
      },
    },
  });

  return (
    <>
      <div className='ml-5 mt-4 items-start'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-4'>
          <div className='flex flex-col'>
            <form action={searchEquipment}>
              <Input
                name='searchQuery'
                label='Wyszukiwarka'
                isClearable
                radius='sm'
                classNames={{
                  label: 'text-black/50 dark:text-white/90',
                  input: [
                    'bg-transparent',
                    'text-black/90 dark:text-white/90',
                    'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'border-black',
                    'bg-default-200/50',
                    'dark:bg-default/60',
                    'backdrop-blur-xl',
                    'backdrop-saturate-200',
                    'hover:bg-default-200/70',
                    'dark:hover:bg-default/70',
                    'group-data-[focused=true]:bg-default-200/50',
                    'dark:group-data-[focused=true]:bg-default/60',
                    '!cursor-text',
                  ],
                }}
                placeholder='Co chcesz znaleźć...'
                startContent={
                  <SearchIcon className='pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90' />
                }
              />
            </form>
          </div>
        </div>
      </div>
      <div className='m-4 flex flex-col items-center gap-2 md:flex-row md:flex-wrap md:justify-between'>
        {allEquipment.map((equipment) => (
          <EquipmentCard
            key={equipment.id}
            id={equipment.id}
            image={equipment.image || '/Logo.svg'}
            model={equipment.model}
            evidenceId={equipment.registrationNumber}
            isDisabled={equipment.fault[0]?.present || false}
            validityDate={equipment.validityDate < new Date()}
            issueDescription={equipment.fault[0]?.description || ''}
            maxLoad={equipment.liftingCapacityKg}
          />
        ))}
      </div>
    </>
  );
}

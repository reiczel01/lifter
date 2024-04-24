import React from 'react';
import EquipmentCard from '@/components/EquipmentCard';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import { db } from '@/db';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
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
            <Input
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
              placeholder='Wpisz numer ewidencyjny...'
              startContent={
                <SearchIcon className='pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90' />
              }
            />
            <div></div>
          </div>
        </div>
      </div>
      <div className='m-5 grid grid-cols-1 items-center gap-5 md:grid-cols-4'>
        {allEquipment.map((equipment) => (
          <EquipmentCard
            key={equipment.id}
            id={equipment.id}
            image={equipment.image || '/Logo.svg'}
            model={equipment.model}
            evidenceId={equipment.registrationNumber}
            isDisabled={equipment.fault[0]?.present || false}
            issueDescription={equipment.fault[0]?.description || ''}
            maxLoad={equipment.liftingCapacityKg}
          />
        ))}
      </div>
    </>
  );
}

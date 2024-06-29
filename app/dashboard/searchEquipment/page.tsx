import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Link,
} from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import EquipmentCard from '@/components/EquipmentCard';
import React from 'react';
import { db } from '@/db';
import { redirect } from 'next/navigation';

async function searchEquipment(formData: FormData) {
  'use server';

  const searchQuery = formData.get('searchQuery')?.toString(); // Pobranie z formularza wartości wyszukiwania

  if (searchQuery) {
    redirect('/dashboard/searchEquipment?query=' + searchQuery); // Przekierowanie na stronę wyszukiwania z danym zapytaniem
  }
}

// Interfejs definiujący właściwości przekazywane do komponentu SearchPage
interface SearchPageProps {
  searchParams: { query: string };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  // Zapytanie do bazy danych o produkty pasujące do zapytania wyszukiwania
  const equipment = await db.equipment.findMany({
    where: {
      OR: [
        { model: { contains: query } },
        { registrationNumber: { contains: query } }, // Wyszukanie po nazwie
        { serialNumber: { contains: query } },
      ],
    },
    include: {
      fault: {
        orderBy: { id: 'desc' },
        take: 1,
      },
    },
    orderBy: [{ id: 'desc' }], // Sortowanie wyników
  });

  // Zliczenie całkowitej liczby elementów (produkty lub inne) w bazie danych
  const totalIetmCount = await db.equipment.count();

  // Sprawdzenie, czy znaleziono jakiekolwiek produkty pasujące do zapytania
  if (equipment.length === 0) {
    // Zwrócenie komunikatu o braku znalezionych produktów
    return (
      <div className='m-auto flex h-full w-full flex-col'>
        <div className='bg-zinc-200'>
          <div className='flex flex-col items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className=' w-1/5 shrink-0  justify-center stroke-current'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                color='red'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h1 className='text-center text-2xl'>Brak wyników wyszukiwania</h1>
          <Link
            href='/dashboard'
            className='mt-4 flex justify-center font-bold uppercase'
          >
            {'<'} Powrót
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='ml-5 mr-5 mt-4 items-start'>
        <div className=' gap-5 '>
          <div className='flex flex-col justify-between gap-2 md:flex-row'>
            <form
              action={searchEquipment}
              className='min-w-[22rem] max-w-[25rem]'
            >
              <Input
                name='searchQuery'
                label='Wyszukiwarka'
                defaultValue={query}
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
                placeholder='Wpisz frazę...'
                startContent={
                  <SearchIcon className='pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90' />
                }
              />
            </form>
            <div className='min-w-[22rem] max-w-[25rem] uppercase'>
              <Card radius='sm' className='bg-transparent'>
                <div className='flex flex-row items-center justify-between'>
                  <CardBody className='m-1 flex flex-row justify-between border-r-1.5 border-gray-300 text-medium font-bold text-gray-500'>
                    <a>Przeszukane: </a>
                    <a>{totalIetmCount}</a>
                  </CardBody>

                  <CardBody className='m-1 flex flex-row justify-between border-l-1.5 border-gray-300 text-medium font-bold text-gray-500'>
                    <a>Znalezione: </a>
                    <a>{equipment.length}</a>
                  </CardBody>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className='m-4 flex flex-col items-center gap-4 md:flex-row md:flex-wrap '>
        {equipment.map((equipment) => (
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

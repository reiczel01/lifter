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
import CreateButton from '@/app/dashboard/tasks/CreateButton';
import TaskCard from '@/components/TaskCard';
import { getUserId, userChecker } from '@/loginChecker';

async function searchTasks(formData: FormData) {
  'use server';

  const searchQuery = formData.get('searchQuery')?.toString(); // Pobranie z formularza wartości wyszukiwania

  if (searchQuery) {
    redirect('/dashboard/searchTasks?query=' + searchQuery); // Przekierowanie na stronę wyszukiwania z danym zapytaniem
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
  const tasks = await db.tasks.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
        { updatedBy: { contains: query } },
      ],
    },
    include: {
      user: {
        select: {
          name: true,
          surname: true,
        },
      },
    },
    orderBy: [{ id: 'desc' }], // Sortowanie wyników
  });

  // Zliczenie całkowitej liczby elementów (produkty lub inne) w bazie danych
  const totalIetmCount = await db.tasks.count();
  const userId = await getUserId();
  const role = await userChecker();

  // Sprawdzenie, czy znaleziono jakiekolwiek produkty pasujące do zapytania
  if (tasks.length === 0) {
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
            href='/dashboard/tasks'
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
      <main className='flex flex-col items-center'>
        <div className='flex w-full items-center justify-between bg-transparent px-5 pb-2 pt-4 text-center'>
          <div>
            <form action={searchTasks} className='min-w-[22rem] max-w-[25rem]'>
              <Input
                name='searchQuery'
                label='Szukaj'
                isClearable
                radius='lg'
                classNames={{
                  label: 'text-black/50 dark:text-white/90',
                  input: [
                    'bg-transparent',
                    'text-black/90 dark:text-white/90',
                    'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
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
                placeholder='Wpisz poszukinwaną frazę...'
                startContent={
                  <SearchIcon className='pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90' />
                }
              />
            </form>
          </div>
          <div>
            <CreateButton userId={userId} />
          </div>
        </div>
        <Divider className='mt-2 w-full' />
        <div className='mt-4 flex w-full justify-center'>
          <div className='flex flex-row flex-wrap justify-center gap-4'>
            {tasks.map((task) => (
              <>
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  isStarted={task.isStarted}
                  isFinished={task.isFinished}
                  updatedAt={String(task.updatedAt)}
                  createdAt={String(task.createdAt)}
                  createdBy={task.user.name + ' ' + task.user.surname}
                  id={task.id}
                  updatedBy={task.updatedBy}
                  userRole={role}
                />
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

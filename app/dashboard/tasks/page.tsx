'use server';
import { Divider, Input } from '@nextui-org/react';
import React from 'react';
import { SearchIcon } from '@nextui-org/shared-icons';
import TaskCard from '@/components/TaskCard';
import { db } from '@/db';
import { getUserId, userChecker } from '@/loginChecker';
import CreateButton from '@/app/dashboard/tasks/CreateButton';
import { redirect } from 'next/navigation';
import { updatedByFetch } from '@/app/dashboard/tasks/handler';

async function searchTasks(formData: FormData) {
  'use server';

  const searchQuery = formData.get('searchQuery')?.toString(); // Pobranie z formularza wartości wyszukiwania

  if (searchQuery) {
    redirect('/dashboard/searchTasks?query=' + searchQuery); // Przekierowanie na stronę wyszukiwania z danym zapytaniem
  }
}

export default async function Tasks() {
  const tasks = await db.tasks.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          name: true,
          surname: true,
        },
      },
    },
  });

  const userId = await getUserId();
  const role = await userChecker();

  return (
    <main className='flex flex-col items-center p-4'>
      <div className='flex w-full flex-col items-center justify-between bg-transparent text-center md:flex-row md:px-5 md:pb-2 md:pt-4'>
        <div className='w-full max-w-lg'>
          <form action={searchTasks} className='w-full'>
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
              placeholder='Wpisz poszukiwaną frazę...'
              startContent={
                <SearchIcon className='pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90' />
              }
            />
          </form>
        </div>
        <div className='mt-4 md:mt-0'>
          <CreateButton userId={userId} />
        </div>
      </div>
      <Divider className='mt-4 w-full' />
      <div className='mt-4 flex w-full justify-center'>
        <div className='flex flex-col flex-wrap items-center gap-4 md:flex-row md:justify-center'>
          {tasks.map((task) => (
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
              updatedBy={updatedByFetch(task.updatedBy)}
              userRole={role}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

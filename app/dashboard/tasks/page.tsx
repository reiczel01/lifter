import { Divider, Input } from '@nextui-org/react';
import React from 'react';
import { Button } from '@nextui-org/button';
import { SearchIcon } from '@nextui-org/shared-icons';

export default function Tasks() {
  return (
    <main className='flex flex-col'>
      <div className='flex items-center justify-between bg-transparent px-5 pb-2 pt-4 text-center '>
        <div>
          <Input
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
        </div>
        <div className='flex flex-row flex-wrap gap-10 uppercase text-blue-50'>
          <div className='m-4 rounded-xl bg-green-600 px-4 py-3'>
            <a>Wszystkie: </a>
            <a>78945421</a>
          </div>
          <div className='m-4 rounded-xl bg-yellow-400 px-4 py-3'>
            <a>Rozpoczęte: </a>
            <a>78945421</a>
          </div>
          <div className='m-4 rounded-xl bg-red-600 px-4 py-3'>
            <a>Zakończone: </a>
            <a>78945421</a>
          </div>
        </div>
        <div>
          <Button size='lg' color='primary'>
            Dodaj nowe zadanie
          </Button>
        </div>
      </div>
      <Divider className='mt-2' />
    </main>
  );
}

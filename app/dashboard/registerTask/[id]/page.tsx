'use client';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { ArrowRightIcon } from '@nextui-org/shared-icons';
import { registerTask } from '@/app/dashboard/registerTask/[id]/handler';

export default function CreateTasks({ params }: { params: { id: string } }) {
  const [formState, action] = useFormState(registerTask, { message: '' });
  const router = useRouter();

  console.log('id', params.id);
  useEffect(() => {
    if (formState.message === 'Utworzono zadanie') {
      router.push(`/dashboard/tasks`);
    }
  }, [formState.message, router]);

  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4'>
      <form className='w-full max-w-lg' action={action}>
        <Card className='mt-4 w-full'>
          <CardHeader className='flex w-full flex-col items-center gap-4 md:flex-row md:justify-between'>
            <div className='flex flex-col'>
              <p className='text-xl'>Edycja zadań</p>
              <p className='text-lg text-default-500'>LIFTER</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className='flex w-full flex-col gap-3 px-4 md:flex-row md:items-center md:px-10'>
            <div className='w-full'>
              <Input
                isRequired
                name='title'
                type='text'
                label='Tytuł'
                className='mt-4'
                fullWidth
              />
              <Textarea
                label='Opis zadania'
                name='description'
                type='text'
                className='mt-4 w-full'
              />
              <Input className='hidden' name='id' value={params.id} readOnly />
              <div className='mt-4 flex items-center justify-between'>
                <div className='text-red-500'>{formState.message}</div>
                <Button color={'primary'} type='submit'>
                  Zapisz zmiany
                  <ArrowRightIcon />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </form>
    </div>
  );
}

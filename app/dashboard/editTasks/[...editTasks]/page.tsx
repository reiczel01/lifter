'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Textarea,
} from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { editTask } from '@/app/dashboard/editTasks/[...editTasks]/handler';
import { useFormState } from 'react-dom';
import { ArrowRightIcon } from '@nextui-org/shared-icons';

export default function EditTasks() {
  const params = useParams();
  const editTasksParams = Array.isArray(params.editTasks)
    ? params.editTasks
    : [];
  const decodedParams = editTasksParams.map((param) =>
    decodeURIComponent(param),
  );

  const [id, title, description, initialIsFinished] = decodedParams;
  const [isFinished, setIsFinished] = useState(initialIsFinished === 'true');
  const [formState, action] = useFormState(editTask, { message: '' });
  const router = useRouter();

  useEffect(() => {
    if (formState.message === 'Uaktualniono zadanie') {
      router.replace(`/dashboard/tasks`);
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
                defaultValue={title}
                type='text'
                label='Tytuł'
                className='mt-4'
                fullWidth
              />
              <Textarea
                label='Opis zadania'
                name='description'
                defaultValue={description}
                type='text'
                className='mt-4 w-full'
              />
              <div className='mt-3 flex items-center gap-3'>
                <Checkbox
                  name='isFinished'
                  isSelected={isFinished}
                  onChange={() => setIsFinished(!isFinished)}
                  defaultSelected={initialIsFinished === 'true'}
                  value={isFinished ? 'true' : 'false'}
                  className='mt-4'
                >
                  Zakończone
                </Checkbox>
              </div>
              <Input className='hidden' name='id' value={id} readOnly />
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

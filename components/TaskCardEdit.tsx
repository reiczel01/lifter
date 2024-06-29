'use client';
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ScrollShadow,
  Tooltip,
  Textarea,
  Input,
  Checkbox,
} from '@nextui-org/react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import {
  changeIsFinishedTrue,
  changeIsStartedFalse,
  changeIsStartedTrue,
  deleteTask,
} from '@/app/dashboard/tasks/handler';

export default function TaskCardEdit({
  title,
  createdAt,
  updatedAt,
  id,
  isFinished,
  isStarted,
  description,
  createdBy,
  updatedBy,
}: Readonly<{
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  isFinished: boolean | 'false';
  isStarted: boolean | 'false';
  createdBy: string;
  updatedBy: string;
}>) {
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy', { locale: pl });
  }

  function formatDateTime(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy, HH:mm', { locale: pl });
  }

  const router = useRouter();

  const reloadPage = () => {
    router.refresh();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    reloadPage();
  };

  const handleChangeIsStartedFalse = async (id: number) => {
    await changeIsStartedFalse(id);
    reloadPage();
  };

  const handleChangeIsStartedTrue = async (id: number) => {
    await changeIsStartedTrue(id);
    reloadPage();
  };

  const handleChangeIsFinishedTrue = async (id: number) => {
    await changeIsFinishedTrue(id);
    reloadPage();
  };

  return (
    <Card className='min-w-[400px] max-w-[600px]'>
      <CardHeader className='justify-between'>
        <div className='flex gap-5'>
          <div className='flex flex-col items-start justify-center gap-1'>
            <h4 className='text-small font-semibold leading-none text-default-600'>
              <Input
                type='string'
                defaultValue={title}
                label='Tytuł'
                required
              />
            </h4>
          </div>
        </div>
        <div className='relative flex items-center justify-end gap-2'></div>
      </CardHeader>
      <CardBody className='gap-3 px-3 py-0 text-small'>
        <ScrollShadow size={10} className='max-h-[400px] max-w-[600px]'>
          <Textarea
            isRequired
            label='Opis'
            defaultValue={description}
            labelPlacement='outside'
            placeholder='Opisz zadanie...'
            className='h-max w-full'
          />
        </ScrollShadow>
        <Checkbox defaultSelected>Zakończone</Checkbox>
      </CardBody>
      <CardFooter className='justify-between gap-3'>
        <div></div>

        <Button color='primary' radius='full' size='sm'>
          Zatwierdź
        </Button>
      </CardFooter>
    </Card>
  );
}

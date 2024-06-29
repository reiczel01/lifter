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
} from '@nextui-org/react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import Linkify from 'react-linkify';
import { useRouter } from 'next/navigation';
import {
  changeIsFinishedTrue,
  changeIsStartedFalse,
  changeIsStartedTrue,
  deleteTask,
} from '@/app/dashboard/tasks/handler';

export default function TaskCard({
  title,
  createdAt,
  updatedAt,
  id,
  isFinished,
  isStarted,
  description,
  createdBy,
  updatedBy,
  userRole,
}: Readonly<{
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  isFinished: boolean | 'false';
  isStarted: boolean | 'false';
  createdBy: string;
  updatedBy: any;
  userRole: string;
}>) {
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy', { locale: pl });
  }

  function formatDateTime(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy, HH:mm', { locale: pl });
  }

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

  const router = useRouter();
  const handleEdit = async (
    id: number,
    title: string,
    descriptions: string,
    isFinished: boolean | string,
  ) => {
    router.push(
      `/dashboard/editTasks/${id}/${title}/${descriptions}/${isFinished}`,
    );
  };
  return (
    <Card className='max-w-[400px]'>
      <CardHeader className='justify-between'>
        <div className='flex gap-5'>
          <div className='flex flex-col items-start justify-center gap-1'>
            <h4 className='text-small font-semibold leading-none text-default-600'>
              {title}
            </h4>
            <h5 className='text-small tracking-tight text-default-400'>
              {createdBy}
            </h5>
          </div>
        </div>
        <div className='relative flex items-center justify-end gap-2'>
          {userRole === 'admin' ? (
            <>
              <Tooltip content='Edytuj zadanie'>
                <span
                  className='cursor-pointer text-lg text-default-400 active:opacity-50'
                  onClick={() => handleEdit(id, title, description, isFinished)}
                >
                  <svg
                    aria-hidden='true'
                    fill='none'
                    focusable='false'
                    height='1em'
                    role='presentation'
                    viewBox='0 0 20 20'
                    width='1em'
                  >
                    <path
                      d='M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                      strokeWidth={1.5}
                    />
                    <path
                      d='M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                      strokeWidth={1.5}
                    />
                    <path
                      d='M2.5 18.3333H17.5'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                      strokeWidth={1.5}
                    />
                  </svg>
                </span>
              </Tooltip>
              <Tooltip color='danger' content='Usuń zadanie'>
                <span
                  className='cursor-pointer text-lg text-danger active:opacity-50 '
                  onClick={() => handleDeleteTask(id)}
                >
                  <svg
                    aria-hidden='true'
                    fill='none'
                    focusable='false'
                    height='1em'
                    role='presentation'
                    viewBox='0 0 20 20'
                    width='1em'
                  >
                    <path
                      d='M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                    />
                    <path
                      d='M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                    />
                    <path
                      d='M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                    />
                    <path
                      d='M8.60834 13.75H11.3833'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                    />
                    <path
                      d='M7.91669 10.4167H12.0834'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                    />
                  </svg>
                </span>
              </Tooltip>
            </>
          ) : null}
        </div>
      </CardHeader>
      <CardBody className='px-3 py-0 text-small'>
        <ScrollShadow size={10} className='max-h-[400px] max-w-[600px]'>
          <Linkify>
            <p>{description}</p>
          </Linkify>
        </ScrollShadow>
      </CardBody>
      <CardFooter className='justify-between gap-3'>
        <div>
          <div className='flex gap-1'>
            <p className='text-small text-default-400'>Utworzone:</p>
            <p className='text-small font-semibold text-default-400'>
              {formatDateTime(createdAt)}
            </p>
          </div>
          {isFinished && (
            <div className='flex gap-1'>
              <p className='text-small text-default-400'>Zakończone:</p>
              <p className='text-small font-semibold text-default-400'>
                {formatDateTime(updatedAt)} {updatedBy}
              </p>
            </div>
          )}
        </div>
        {!isFinished &&
          (isStarted ? (
            <>
              <Button
                color='warning'
                radius='full'
                size='sm'
                onClick={() => handleChangeIsStartedFalse(id)}
              >
                Anuluj rozpoczęcie
              </Button>
              <Button
                color='danger'
                radius='full'
                size='sm'
                onClick={() => handleChangeIsFinishedTrue(id)}
              >
                Zakończ
              </Button>
            </>
          ) : (
            <Button
              color='primary'
              radius='full'
              size='sm'
              onClick={() => handleChangeIsStartedTrue(id)}
            >
              Rozpocznij
            </Button>
          ))}
      </CardFooter>
    </Card>
  );
}

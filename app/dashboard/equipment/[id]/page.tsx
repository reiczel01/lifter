import { notFound } from 'next/navigation';
import { db } from '@/db';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Tooltip,
} from '@nextui-org/react';
import Barcode from '@/components/barcode';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import React from 'react';
import ModalSizable from '@/components/ModalSizable';
import FaultCard from '@/components/FaultCard';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import TabelOfUsage from '@/components/TabelOfUsage';

interface EquipmentPageProps {
  params: {
    id: string;
  };
}

export default async function EquipmentPage(props: EquipmentPageProps) {
  const equipment = await db.equipment.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
    include: {
      fault: {
        orderBy: { id: 'desc' },
        select: {
          id: true,
          present: true,
          title: true,
          createdAt: true,
          description: true,
          solution: true,
        },
      },
      permissions: true,
      type: true,
    },
  });

  if (!equipment) {
    return notFound();
  }

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: pl });
  }

  function formatDateTime(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy, HH:mm:ss', { locale: pl });
  }
  const faulty =
    equipment.fault && equipment.fault[0] ? equipment.fault[0].present : false;

  return (
    <main className={`my-4 flex flex-col px-4 sm:px-6 lg:px-8`}>
      <div className={`flex flex-col gap-4 lg:flex-row `}>
        <div className='flex-1 rounded-lg bg-white p-4 shadow lg:w-1/3 lg:flex-none'>
          <div className={`mb-4 mt-2 ${faulty ? '' : 'hidden'}`}>
            <Card>
              <CardHeader className='flex animate-pulse justify-center gap-3 bg-red-600'>
                <h1 className='text-3xl font-bold uppercase text-white'>
                  UWAGA: usterka sprzętu
                </h1>
              </CardHeader>
            </Card>
          </div>
          <div className='m-2'>
            <p className='font-bold uppercase'>model:</p>
            <a className='text-xl'> {equipment.model} </a>
          </div>
          <Divider className='my-4' />
          <div className='m-2'>
            <div className='flex flex-row items-center justify-between'>
              <div>
                <p className='font-bold uppercase'>Numer seryjny:</p>
                <a className='text-xl'>{equipment.serialNumber}</a>
              </div>
              <Barcode value={equipment.serialNumber} height={50} />
            </div>
          </div>
          <Divider className='my-4' />
          <div className='m-2'>
            <div className='flex flex-row items-center justify-between'>
              <div>
                <p className='font-bold uppercase'>Numer ewidencyjny:</p>
                <a className='text-xl'>{equipment.registrationNumber}</a>
              </div>
              <Barcode value={equipment.registrationNumber} height={50} />
            </div>
          </div>
          <Divider className='my-4' />
          <div className='m-2'>
            <p className='font-bold uppercase'>Rok produkcji:</p>
            <a className='text-xl'> {equipment.constructionYear} </a>
          </div>
          <Divider className='my-4' />
          <div className='m-2'>
            <p className='font-bold uppercase'>Ważność decyzji:</p>
            <a className='text-xl uppercase'>
              {formatDate(equipment.validityDate)}
            </a>
          </div>
          <Divider className='my-4' />
          <div className='m-2'>
            <ModalSizable title={'Instrukcja obsługi'} size={'full'}>
              <iframe
                className='h-full w-full'
                src='/udt_test.pdf'
                title='PDF'
              />
            </ModalSizable>
            <ModalSizable
              className={'mt-2'}
              title={'Protokół odbioru'}
              size={'full'}
            >
              <iframe
                className='h-full w-full'
                src='/udt_test.pdf'
                title='PDF'
              />
            </ModalSizable>
            <ModalSizable
              className={'mt-2'}
              title={'Schematy sprzętu'}
              size={'full'}
            >
              <iframe
                className='h-full w-full'
                src='/udt_test.pdf'
                title='PDF'
              />
            </ModalSizable>
          </div>
        </div>
        <div className='flex-1 rounded-lg bg-white p-4 shadow lg:w-2/3 lg:flex-none'>
          <h1 className='text-xl font-bold uppercase'>Decyzja:</h1>
          <iframe
            className='h-96 w-full sm:h-[98%]'
            src='/udt_test.pdf'
            title='PDF'
          />
        </div>
      </div>
      <div className={`mt-4 flex flex-col gap-4 lg:flex-row`}>
        <div className='flex-1 rounded-lg bg-white p-4 shadow lg:w-1/2 lg:flex-none'>
          <h1 className='mb-3 mt-1 text-xl font-bold'>
            Historia urzytkowania:
          </h1>
          <div className='h-96 overflow-scroll bg-transparent p-1'>
            <TabelOfUsage />
          </div>
        </div>
        <div className=' flex-1  rounded-lg bg-white p-4 shadow lg:w-1/2 lg:flex-none'>
          <h1 className='mb-3 mt-1 text-xl font-bold'>Historia usterek:</h1>
          <div className='h-96 overflow-scroll bg-transparent p-1'>
            {equipment.fault.map((fault) => (
              <FaultCard
                key={fault.id}
                present={fault.present}
                title={fault.title}
                description={fault.description}
                solution={fault.solution}
                createdAt={formatDateTime(fault.createdAt)}
                className='mb-4 '
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

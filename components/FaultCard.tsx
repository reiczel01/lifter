import React from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';

export default function FaultCard({
  present,
  title,
  description,
  solution,
  createdAt,
  className,
}: Readonly<{
  present: boolean;
  title: string;
  description?: string | null;
  solution?: string | null;
  createdAt: string;
  className?: string;
}>) {
  return (
    <Card className={className}>
      <CardHeader className='justify-between'>
        <div className='flex gap-5'>
          <div className='flex flex-col items-start justify-center gap-1'>
            <h1 className='text-medium font-semibold leading-none text-default-600'>
              {title}
            </h1>
            <span className='text-small text-default-600'>{createdAt}</span>
          </div>
        </div>
      </CardHeader>
      <CardBody className='px-3 py-0 text-small text-default-600'>
        <h3 className='font-bold'>Opis usterki:</h3>
        <p>{description}</p>
        <span className={`pt-2 ${solution ? '' : 'hidden'}`}>
          <h3 className='font-bold'>Rozwiązanie:</h3>
          <span className='py-2'>{solution}</span>
        </span>
      </CardBody>
      <CardFooter className='gap-2'>
        {present ? (
          <Card className='w-full'>
            <CardHeader className='flex justify-center gap-2 bg-red-600'>
              <h1 className='text-medium font-bold uppercase text-white'>
                usterka dalej występuje
              </h1>
            </CardHeader>
          </Card>
        ) : (
          <Card className='w-full'>
            <CardHeader className='flex justify-center gap-2 bg-green-600'>
              <h1 className='text-medium font-bold uppercase text-white'>
                usterka została usunięta
              </h1>
            </CardHeader>
          </Card>
        )}
      </CardFooter>
    </Card>
  );
}

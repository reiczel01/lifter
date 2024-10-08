'use client';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react';
import { deleteFault } from '@/app/dashboard/equipment/[id]/handler';
import { useRouter } from 'next/navigation';

export default function FaultCard({
  present,
  title,
  description,
  solution,
  createdAt,
  updatedAt,
  className,
  role,
  userId,
  equipmentId,
  id,
}: Readonly<{
  present: boolean;
  title: string;
  description: string | '';
  solution: string | '';
  createdAt: string;
  className?: string;
  updatedAt: string;
  role: string;
  userId: number;
  id: number;
  equipmentId: number;
}>) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteFault(id);
      alert('Usterka została usunięta');
      router.refresh();
    } catch (error) {
      console.error('Error deleting fault:', error);
      alert('Wystąpił błąd podczas usuwania usterki');
    }
  };

  const handleEdit = () => {
    // Zamiana pustych wartości na "null"
    const descriptionParam = description ? description : 'null';
    const solutionParam = solution ? solution : 'null';

    router.push(
      `/dashboard/editFault/${id}/${userId}/${encodeURIComponent(descriptionParam)}/${encodeURIComponent(solutionParam)}/${encodeURIComponent(title)}/${present}/${equipmentId}`,
    );
  };

  return (
    <Card className={className}>
      <CardHeader className='justify-between'>
        <div className='flex gap-5'>
          <div className='flex flex-col items-start justify-center gap-1'>
            <h1 className='text-medium font-semibold leading-none text-default-600'>
              {title}
            </h1>
            <span className='text-small text-default-600'>
              Utworzona: {createdAt}
            </span>

            <span className='text-small text-default-600'>
              Edytowane: {updatedAt}
            </span>
          </div>
        </div>
        {role === 'admin' || role === 'technician' ? (
          <div className='m-3 flex gap-2 rounded-2xl bg-gray-200 p-3'>
            <Button color='primary' variant='light' onClick={handleEdit}>
              Edytuj
            </Button>
            <Button onClick={handleDelete} color='danger' variant='light'>
              Usuń
            </Button>
          </div>
        ) : (
          <></>
        )}
      </CardHeader>
      <CardBody className='px-3 py-0 text-small text-default-600'>
        <h3 className='font-bold'>Opis usterki:</h3>
        <p>{description}</p>
        <span className={`pt-2 ${solution ? '' : 'hidden'}`}>
          <h3 className='font-bold'>Rozwiązanie:</h3>
          <span className='py-2'>{solution}</span>
        </span>
      </CardBody>
      <CardFooter className='flex flex-col gap-2'>
        {present && (
          <Card className='w-full'>
            <CardHeader className='flex justify-center gap-2 bg-red-600'>
              <h1 className='text-medium font-bold uppercase text-white'>
                usterka dalej występuje
              </h1>
            </CardHeader>
          </Card>
        )}
        {!present && solution && (
          <Card className='w-full'>
            <CardHeader className='flex justify-center gap-2 bg-green-600'>
              <h1 className='text-medium font-bold uppercase text-white'>
                usterka została usunięta
              </h1>
            </CardHeader>
          </Card>
        )}
        {!present && !solution && (
          <Card className='w-full'>
            <CardHeader className='flex justify-center gap-2 bg-yellow-400'>
              <h1 className='text-medium font-bold uppercase text-white'>
                usterka występuje, nie zagraża bezpieczeństwu
              </h1>
            </CardHeader>
          </Card>
        )}
      </CardFooter>
    </Card>
  );
}

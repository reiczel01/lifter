'use client';
import { Button, Input } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { Textarea } from '@nextui-org/react';
import { registerUserUsage } from '@/app/dashboard/equipment/[id]/handler';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import { wait } from 'next/dist/lib/wait';
import { router } from 'next/client';
import { useRouter } from 'next/navigation';
import ModalSizable from '@/components/ModalSizable';

interface RegisterUserUsageProps {
  equipmentId: string;
  userId: string;
}

export default function RegisterUserUsage({
  equipmentId,
  userId,
}: RegisterUserUsageProps) {
  const [formState, action] = useFormState(registerUserUsage, { message: '' });

  const router = useRouter();

  const reloadPage = () => {
    router.refresh();
  };
  useEffect(() => {
    if (formState.message === 'Zarejestrowano użycie sprzętu') {
      reloadPage();
    }
  }, [formState.message, router]);

  console.log('equipmentId', equipmentId);
  return (
    <ModalSizable
      title={'Zarejestruj użycie sprzętu'}
      size={'md'}
      className={'float-end w-1/2'}
    >
      <form action={action}>
        <div className='flex w-full flex-col content-between items-center justify-center gap-5'>
          <Textarea
            name='comment'
            label='Uwagi'
            placeholder='Wpisz uwagi...'
            className='max-w-xs'
          />
          <Input className='hidden' name='equipmentId' value={equipmentId} />
          <Input className='hidden' name='userId' value={userId} />
          <div>{formState.message} </div>
          <Button type='submit'>Zarejestruj użycie</Button>
        </div>
      </form>
    </ModalSizable>
  );
}

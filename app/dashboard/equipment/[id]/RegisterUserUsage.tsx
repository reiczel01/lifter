'use client';
import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { Textarea } from '@nextui-org/react';
import { registerUserUsage } from '@/app/dashboard/equipment/[id]/handler';
import { useFormState } from 'react-dom';

interface RegisterUserUsageProps {
  equipmentId: string;
  userId: string;
}

export default function RegisterUserUsage({
  equipmentId,
  userId,
}: RegisterUserUsageProps) {
  const [formState, action] = useFormState(registerUserUsage, { message: '' });
  console.log('equipmentId', equipmentId);
  return (
    <form action={action}>
      <div className='flex w-full flex-row content-between items-center justify-center gap-5'>
        <Textarea
          name='comment'
          label='Uwagi'
          placeholder='Wpisz uwagi...'
          className='max-w-xs'
        />
        <Input className='hidden' name='equipmentId' value={equipmentId} />
        <Input className='hidden' name='userId' value={userId} />
        <div>{formState.message}</div>
        <Button type='submit'>Zarejestruj urzycie</Button>
      </div>
    </form>
  );
}

'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import React from 'react';

interface CreateButtonProps {
  userId: string;
}

export default function CreateButton(props: CreateButtonProps) {
  const router = useRouter();

  const redirectOnClick = () => {
    router.push(`/dashboard/registerTask/${props.userId}`);
  };

  return (
    <Button size='lg' color='primary' onClick={redirectOnClick}>
      Dodaj nowe zadanie
    </Button>
  );
}

'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { redirect, useRouter } from 'next/navigation';

export default function EditButton({ id }: { id: string }) {
  const router = useRouter();
  const handleEdit = async () => {
    router.replace(`/dashboard/editEquipment/${id}`);
  };

  return (
    <Button color='primary' variant='light' onClick={handleEdit}>
      Edytuj
    </Button>
  );
}

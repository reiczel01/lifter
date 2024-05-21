'use server';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { db } from '@/db';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface Raws {
  id: number;
}
export default async function TabelOfUsage(props: Raws) {
  const userLog = await db.userLog.findMany({
    where: {
      equipmentId: props.id,
    },
    include: {
      user: true,
    },
  });
  function formatDateTime(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy, HH:mm:ss', { locale: pl });
  }
  return (
    <Table isStriped aria-label='Example static collection table '>
      <TableHeader>
        <TableColumn>URZYTKOWNIK</TableColumn>
        <TableColumn>UWAGI</TableColumn>
        <TableColumn>CZAS POBRANIA</TableColumn>
      </TableHeader>
      <TableBody>
        {userLog.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.user.name}</TableCell>
            <TableCell>{item.comment}</TableCell>
            <TableCell>{formatDateTime(item.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

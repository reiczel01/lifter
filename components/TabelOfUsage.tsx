'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { db } from '@/db';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  licenceNumber: string | null;
  peselNumber: number | null;
  permissionsValidityDate: Date | null;
  role: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UserLog {
  id: number;
  comment: string;
  createdAt: Date;
  user: User;
}

interface TabelOfUsageProps {
  userLogs: UserLog[];
}

export default function TabelOfUsage(userLogs: TabelOfUsageProps) {
  function formatDateTime(date: Date) {
    return format(date, 'dd MMMM yyyy, HH:mm:ss', { locale: pl });
  }

  return (
    <Table aria-label='Example static collection table'>
      <TableHeader>
        <TableColumn>URZYTKOWNIK</TableColumn>
        <TableColumn>UWAGI</TableColumn>
        <TableColumn>CZAS POBRANIA</TableColumn>
      </TableHeader>
      <TableBody>
        {userLogs.userLogs.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              {item.user.name} {item.user.surname}
            </TableCell>
            <TableCell>{item.comment}</TableCell>
            <TableCell>{formatDateTime(item.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Link,
} from '@nextui-org/react';
import userUsageLog from '@/app/dashboard/user/hendler';

interface LogItem {
  id: number;
  comment: string;
  createdAt: string;
  userId: string;
  equipmentId: number;
  equipment: {
    registrationNumber: string;
    id: number;
    model: string;
  };
}

export default function Usage() {
  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logData = await userUsageLog();
        // @ts-ignore
        setLogs(logData);
      } catch (error) {
        console.error('Error fetching user logs:', error);
      }
    };

    fetchData();
  }, []);

  const pages = useMemo(() => Math.ceil(logs.length / rowsPerPage), [logs]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return logs.slice(start, end);
  }, [page, logs]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderCell = (item: LogItem, columnKey: React.Key) => {
    switch (columnKey) {
      case 'comment':
        return item.comment;
      case 'createdAt':
        return formatDate(item.createdAt);
      case 'registrationNumber':
        return item.equipment.registrationNumber;
      case 'link':
        return (
          <Link
            showAnchorIcon
            href={`/dashboard/equipment/${item.equipment.id}`}
          >
            {item.equipment.model}
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <Table
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='primary'
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
    >
      <TableHeader>
        <TableColumn allowsSorting={true} key='comment'>
          UWAGI
        </TableColumn>
        <TableColumn key='createdAt'>DATA I CZAS POBRANIA</TableColumn>
        <TableColumn key='registrationNumber'>NR EWIDENCYJNY</TableColumn>
        <TableColumn key='link'>LINK</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

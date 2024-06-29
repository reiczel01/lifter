'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Button,
  Spinner, // Import Button component from @nextui-org/react
} from '@nextui-org/react';
import { usersFetch } from '@/app/dashboard/userAdministration/handler';
import { useRouter } from 'next/navigation';

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
  disabled: boolean;
}

function formatDate(date: Date | null): string {
  if (!date) return 'N/A';
  return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
}

export default function UserAdministration() {
  const [users, setUsers] = useState<User[]>([]); // Initialize as an empty array with User type
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state
  const rowsPerPage = 15;
  const router = useRouter();

  useEffect(() => {
    console.log('useEffect called'); // Debugging to check if useEffect is called

    const fetchUsers = async () => {
      try {
        const fetchedUsers = await usersFetch();
        console.log('Fetched users:', fetchedUsers); // Log fetched data
        setUsers(fetchedUsers);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchUsers(); // Call the async function
  }, []);

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const handleEdit = (userId: string) => {
    // Add your edit handling logic here
    router.push(`/dashboard/userEdit/${userId}`); // Redirect to user edit page with userId
  };

  if (loading) {
    return (
      <div className='m-6 flex h-full w-full flex-col items-center justify-center gap-3'>
        <Spinner size='lg' />
        <h1 className='mt-3 text-xl'>Ładowanie...</h1>
      </div>
    );
  }

  return (
    <div className='h-full w-full p-2'>
      <h1 className='m-4 text-2xl'>Zarządzanie użytkownikami:</h1>
      <Table
        aria-label='Example table with client side pagination'
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
          <TableColumn key='name'>IMIĘ</TableColumn>
          <TableColumn key='surname'>NAZWISKO</TableColumn>
          <TableColumn key='email'>EMAIL</TableColumn>
          <TableColumn key='licenceNumber'>NUMER ZAŚWIADCZENIA</TableColumn>
          <TableColumn key='peselNumber'>PESEL</TableColumn>
          <TableColumn key='permissionsValidityDate'>
            DATA WAŻNOŚCI UPR.
          </TableColumn>
          <TableColumn key='role'>ROLA</TableColumn>
          <TableColumn key='disabled'>DEZAKTYWOWANE</TableColumn>
          <TableColumn key='createdAt'>STWORZONY</TableColumn>
          <TableColumn key='updatedAt'>EDYTOWANY</TableColumn>
          <TableColumn key='edit'>EDYTUJ</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === 'permissionsValidityDate' ||
                  columnKey === 'createdAt' ||
                  columnKey === 'updatedAt' ? (
                    formatDate(item[columnKey as keyof User] as Date | null)
                  ) : columnKey === 'edit' ? (
                    <Button onClick={() => handleEdit(item.id)}>Edytuj</Button>
                  ) : columnKey === 'disabled' ? (
                    item.disabled ? (
                      'tak'
                    ) : (
                      'nie'
                    )
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

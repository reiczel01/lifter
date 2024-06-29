import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { getSession } from '@/app/api/auth/session/route';
import { cookies } from 'next/headers';
import { db } from '@/db';
import Barcode from '@/components/barcode';
import React from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import Usage from '@/app/dashboard/user/Usage';

export default async function UserPage() {
  const session = await getSession();
  let data = { id: '' };
  if (session) {
    data = JSON.parse((cookies().get('user-data')?.value as string) || '{}');
  }
  const user = await db.user.findFirst({
    where: {
      id: data.id,
    },
    include: {
      permissions: true,
    },
  });

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy', { locale: pl });
  }

  function formatDateTime(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy HH:mm:ss', { locale: pl });
  }

  const isPermissionValid = (dateString: any) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date >= new Date();
  };

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center p-4'>
      <div className='w-full md:w-3/4 xl:w-1/2'>
        <Card
          className={` w-full p-2 ${!isPermissionValid(user?.permissionsValidityDate) ? 'bg-red-100' : ''}`}
        >
          <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
            <div className='flex w-full flex-col justify-between md:flex-row'>
              <div>
                <h1 className='text-3xl font-semibold leading-none text-default-600'>
                  {user?.name} {user?.surname}
                </h1>
                <div className='mt-2 flex flex-col'>
                  <span className='text-small text-default-600'>
                    Utworzenie: {formatDate(user?.createdAt)}
                  </span>
                  <span className='text-small text-default-600'>
                    Edytowane: {formatDateTime(user?.updatedAt)}
                  </span>
                </div>
              </div>
              <Barcode value={String(user?.peselNumber)} height={60} />
            </div>
          </CardHeader>
          <Divider className='my-2' />
          <CardBody className='gap-2 overflow-visible px-4 pb-4'>
            <div className='flex w-full flex-col items-center justify-between md:flex-row'>
              <div>
                <h2 className='text-xl font-semibold leading-none text-default-600'>
                  NR ZAŚWIADCZENIA: {user?.licenceNumber}
                </h2>
                {!isPermissionValid(user?.permissionsValidityDate) ? (
                  <>
                    <h3 className='text-medium font-bold uppercase text-red-700'>
                      Data ważności uprawnień wygasła!!!
                    </h3>
                    <span className='text-medium text-red-700'>
                      Data ważności: {formatDate(user?.permissionsValidityDate)}
                    </span>
                  </>
                ) : (
                  <span className='text-medium text-default-600'>
                    Data ważności: {formatDate(user?.permissionsValidityDate)}
                  </span>
                )}
              </div>
              <Barcode value={String(user?.licenceNumber)} height={60} />
            </div>
            <div className='flex w-full flex-col items-start justify-between gap-2 md:flex-row'>
              <div className='flex flex-col'>
                <div className='flex w-full items-center justify-between'>
                  <h2 className='text-medium font-semibold leading-none text-default-600'>
                    E-mail: {user?.email}
                  </h2>
                </div>
                <div className='mt-1 flex w-full items-center justify-between'>
                  <h2 className='text-medium font-semibold leading-none text-default-600'>
                    PESEL: {user?.peselNumber}
                  </h2>
                </div>
                <div className='mt-1 flex w-full items-center justify-between'>
                  <h2 className='flex text-medium font-semibold leading-none text-default-600'>
                    Uprawnienia systemowe:{' '}
                    <div className='ml-1 uppercase'>{user?.role}</div>
                  </h2>
                </div>
              </div>
              <div className='flex flex-col items-center justify-start gap-2 md:flex-row'>
                <h2 className='text-medium font-semibold leading-none text-default-600'>
                  Uprawnienia:
                </h2>
                <div className='uppercase'>
                  {user?.permissions.map((perms) => (
                    <p
                      key={perms.id}
                      className='text-medium font-semibold leading-none text-default-600'
                    >
                      {perms.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className='m-4 w-full rounded-xl bg-white p-4 md:w-3/4 xl:w-1/2'>
        <h1 className='mb-3 text-2xl font-semibold leading-none text-default-600'>
          Rejestr użycia sprzętów
        </h1>
        <Usage />
      </div>
    </div>
  );
}

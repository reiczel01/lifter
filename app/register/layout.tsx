import React from 'react';
import { getSession } from '@/app/api/auth/session/route';
import { redirect } from 'next/navigation';

// @ts-ignore
export default async function LayoutPage({ children }) {
  const session = await getSession();
  if (session) {
    redirect('/dashboard/');
  }
  return <main className='flex flex-col'>{children}</main>;
}

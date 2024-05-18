import React from 'react';
import NavBar from '@/components/NavBar';
import { getSession } from '@/app/api/auth/session/route';
import Footer from '@/components/Footer';
import { redirect } from 'next/navigation';
import { getCookieUserData } from '@/app/api/auth/cookie/route';
import { cookies } from 'next/headers';

// @ts-ignore
async function LayoutPage({ children }) {
  const session = await getSession();
  let data = { role: '' };
  if (!session) {
    redirect('/');
  } else {
    data = JSON.parse((cookies().get('user-data')?.value as string) || '{}');
  }
  return (
    <main className='flex flex-col'>
      {session && <NavBar role={data.role} />}
      {children}
      <Footer />
    </main>
  );
}

export default LayoutPage;

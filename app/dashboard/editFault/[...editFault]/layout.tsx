import React from 'react';

import { getSession } from '@/app/api/auth/session/route';

import { redirect } from 'next/navigation';

import { technicianOrAdminChecker } from '@/loginChecker';

// @ts-ignore
async function LayoutPage({ children }) {
  const session = await getSession();
  const access = await technicianOrAdminChecker();
  console.log(access);
  if (!session) {
    redirect('/');
  } else {
    if (!access) {
      redirect('/dashboard/');
    }
  }
  return <main className=''>{children}</main>;
}

export default LayoutPage;

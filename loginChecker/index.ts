'use server';
import { getSession } from '@/app/api/auth/session/route';
import { redirect, useRouter } from 'next/navigation';
import { cookies } from 'next/headers';

export async function userChecker() {
  const session = await getSession();
  if (session) {
    const data = JSON.parse(
      (cookies().get('user-data')?.value as string) || '{}',
    );
    if (data) {
      return data.role;
    }
  } else {
    redirect('/');
  }
}
export async function getUserId() {
  const session = await getSession();
  if (session) {
    const data = JSON.parse(
      (cookies().get('user-data')?.value as string) || '{}',
    );
    if (data) {
      return data.id;
    }
  } else {
    redirect('/');
  }
}

export async function adminChecker() {
  userChecker().then((role) => {
    if (role !== 'admin') {
      redirect('/dashboard/');
    }
  });
}

export async function technicianOrAdminChecker() {
  if (!userChecker) {
    return false;
  } else {
    try {
      const role = await userChecker();
      console.log('sprawdzamy');
      return role === 'technician' || role === 'admin';
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
  }
}

export async function loginChecker() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard/');
  }
}

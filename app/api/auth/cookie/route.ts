'use server';
import { cookies } from 'next/headers';

export async function deleteCookie(name: string): Promise<void> {
  try {
    const cookieStore = cookies();
    await cookieStore.delete(name);
  } catch (error) {
    console.error('Error deleting cookie', error);
  }
}

export async function getCookieUserData(): Promise<any> {
  // Replace `any` with the correct type if known
  try {
    const cookieStore = cookies();
    const cookie = cookieStore.get('user-data');
    if (!cookie) {
      throw new Error('No page.tsx data cookie found');
    }
    const data = JSON.parse(cookie.value);
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error getting cookie', error);
    return null;
  }
}

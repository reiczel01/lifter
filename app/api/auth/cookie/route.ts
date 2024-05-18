'use server';
import { cookies } from 'next/headers';

export async function deleteCookie(name: string) {
  try {
    cookies().delete(name);
  } catch (error) {
    console.error('Error deleting cookie', error);
  }
}

export async function getCookieUserData() {
  try {
    const data = JSON.parse(cookies().get('user-data')?.value);
    console.log(JSON.parse(data));
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error('Error getting cookie', error);
    return null;
  }
}

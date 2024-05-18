import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
export async function getSession() {
  try {
    const session = await getServerSession();
    return await session;
  } catch (error) {
    console.error('Error getting session', error);
    return null;
  }
}

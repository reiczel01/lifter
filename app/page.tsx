import LogIn from '@/components/LogIn';
import { getSession } from '@/app/api/auth/session/route';
import { redirect } from 'next/navigation';

const secret = process.env.NEXTAUTH_SECRET;
export default async function Home() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard/');
  }
  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      <LogIn />
    </main>
  );
}

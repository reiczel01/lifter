import { signOut } from 'next-auth/react';
import { deleteCookie } from '@/app/api/auth/cookie/route';
import { Button } from '@nextui-org/react';

export default function LogOut() {
  return (
    <Button
      variant='flat'
      onClick={() => {
        deleteCookie('page.tsx-data');
        signOut();
      }}
    >
      Wyloguj
    </Button>
  );
}

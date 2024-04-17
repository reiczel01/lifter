import React from 'react';
import { Divider } from '@nextui-org/react';
export default function Footer() {
  return (
    <div>
      <Divider className='mt-4' />
      <div className='footer justify-center bg-transparent p-4 text-center'>
        <a>© 2024 Lifter. Autor Mateusz Reczulski.</a>
      </div>
    </div>
  );
}

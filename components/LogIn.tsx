'use client';
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  Button,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';
import loginUser from '@/app/login/submit';

export default function LogIn() {
  const [formState, action] = useFormState(loginUser, { message: '' });

  return (
    <form action={action}>
      <Card className='max-w-96 items-center'>
        <CardHeader className='flex w-full flex-col items-center gap-4 md:flex-row'>
          <Image
            alt='nextui logo'
            height='max-h-32'
            radius='sm'
            src='/Lifter-logo-only.png'
            width='w-auto'
          />
          <div className='flex flex-col pr-6'>
            <p className='text-xl'>Logowanie</p>
            <p className='text-lg text-default-500'>LIFTER</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className='w-full max-w-80 items-center'>
          <Input
            isRequired
            type='email'
            name='email'
            label='Email'
            className='mt-4'
          />
          <Input
            isRequired
            type='password'
            name='password'
            label='Hasło'
            className='mb-5 mt-4'
          />
          <Button type='submit' color='primary' className='w-full md:w-1/2'>
            Zaloguj się
          </Button>
        </CardBody>
        <Divider />
        <CardFooter className='w-full'>
          <Link
            isExternal
            showAnchorIcon
            href='https://github.com/nextui-org/nextui'
          >
            Zarejestruj się.
          </Link>
          <div>{formState.message}</div>
        </CardFooter>
      </Card>
    </form>
  );
}

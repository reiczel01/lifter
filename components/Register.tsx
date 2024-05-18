'use client';
import { useFormState } from 'react-dom';
import createUser from '@/app/register/submit';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  Image,
  Input,
  Link,
  Tooltip,
} from '@nextui-org/react';
import { ArrowRightIcon } from '@nextui-org/shared-icons';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';

export default function Register() {
  const [formState, action] = useFormState(createUser, { message: '' });
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handlePermissionsChange = (selected: any) => {
    setSelectedPermissions(selected);
  };
  if (formState.message === 'Użytkownik utworzony') {
    redirect('/');
  }
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <form action={action}>
        <Card className='mt-4 max-w-3xl items-center'>
          <CardHeader className='flex w-full flex-col items-center gap-4 md:flex-row'>
            <Image
              alt='nextui logo'
              height='max-h-32'
              radius='sm'
              src='/Lifter-logo-only.png'
              width='w-auto'
            />
            <div className='flex flex-col pr-6'>
              <p className='text-xl'>Rejestracja</p>
              <p className='text-lg text-default-500'>LIFTER</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className='flex w-full flex-col justify-center px-10 md:flex-row md:items-center'>
            <div className='items-center md:mr-8'>
              <Input
                isRequired
                type='text'
                name='name'
                label='Imię'
                className='mt-4'
              />
              <Input
                isRequired
                type='text'
                name='surname'
                label='Nazwisko'
                className='mt-4'
              />
              <Input
                isRequired
                type='email'
                name='email'
                label='Email'
                className='mt-4'
              />
              <Input
                isRequired
                name='password'
                type='password'
                label='Hasło'
                className='mt-4'
              />
              <Input
                isRequired
                name='passwordRetype'
                type='password'
                label='Powtórz hasło'
                className='mt-4'
              />
            </div>
            <div className='items-center md:mr-8'>
              <Input
                isRequired
                type='text'
                name='licenceNumber'
                label='Numer uprawnień'
                className='mt-4'
              />
              <Input
                isRequired
                type='number'
                name='peselNumber'
                label='Numer PESEL'
                className='mt-4'
              />
              <Input
                isRequired
                type='date'
                name='permissionsValidityDate'
                label='Data warzności uprawnień'
                className='mt-4'
              />
            </div>
            <Tooltip
              content={
                <div className='px-1 py-2'>
                  <div className='text-small font-bold'>Typy uprawnień:</div>
                  <div className='text-tiny'>
                    I WJO – uprawnia do obsługi wózków jezdniowych, w tym
                    specjalizowanych.
                  </div>
                  <div className='text-tiny'>
                    II WJO – uprawnia do obsługi wózków jezdniowych
                    podnośnikowych z wyłączeniem specjalizowanych
                  </div>
                  <div className='text-tiny'>
                    III WJO – uprawnia do obsługi wózków jezdniowych
                    podnośnikowych prowadzonych i zdalnie sterowanych
                  </div>
                  <div className='text-tiny'>
                    I S – suwnice, wciągniki i wciągarki sterowane z poziomu
                    roboczego lub z kabiny oraz żurawie stacjonarne warsztatowe
                  </div>
                  <div className='text-tiny'>
                    II S – suwnice, wciągniki i wciągarki sterowane z poziomu
                    roboczego oraz żurawie stacjonarne warsztatowe
                  </div>
                </div>
              }
            >
              <div className='mt-4 md:mt-0'>
                <CheckboxGroup
                  value={selectedPermissions}
                  onChange={handlePermissionsChange}
                  label='Uprawnienia:'
                  name='permissions'
                >
                  <Checkbox value='1'>I WJO</Checkbox>
                  <Checkbox value='2'>II WJO</Checkbox>
                  <Checkbox value='3'>III WJO</Checkbox>
                  <Checkbox value='4'>I S</Checkbox>
                  <Checkbox value='5'>II S</Checkbox>
                </CheckboxGroup>
              </div>
            </Tooltip>
          </CardBody>

          <Divider />
          <CardFooter className='w-full justify-between'>
            <Link showAnchorIcon href='/'>
              Zaloguj się.
            </Link>
            <div>{formState.message}</div>
            <Button
              type='submit'
              color='primary'
              size='md'
              className=' text-sm md:w-1/5'
            >
              Zarejestruj się
              <ArrowRightIcon />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

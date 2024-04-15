import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
  Link,
  CheckboxGroup,
  Checkbox,
  Tooltip,
} from '@nextui-org/react';
import { ArrowRightIcon } from '@nextui-org/shared-icons';

export default function Register() {
  return (
    <Card className='max-w-3xl items-center'>
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
          <Input isRequired type='text' label='Imię' className='mt-4' />
          <Input isRequired type='text' label='Nazwisko' className='mt-4' />
          <Input isRequired type='email' label='Email' className='mt-4' />
          <Input isRequired type='password' label='Hasło' className='mt-4' />
          <Input
            isRequired
            type='password'
            label='Powtórz hasło'
            className='mt-4'
          />
        </div>
        <div className='items-center md:mr-8'>
          <Input
            isRequired
            type='text'
            label='Numer uprawnień'
            className='mt-4'
          />
          <Input
            isRequired
            type='number'
            label='Numer PESEL'
            className='mt-4'
          />
          <Input
            isRequired
            type='date'
            label='Data warzności uprawnień'
            className='mt-4'
          />
          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Upload uprawnień PDF:
            </label>
            <input
              type='file'
              accept='application/pdf'
              className='mt-4 block w-full text-sm
                         text-slate-500 file:mr-4 file:rounded-full
                         file:border-0 file:bg-violet-50
                         file:px-4 file:py-2
                         file:text-sm file:font-semibold
                         file:text-blue-700 hover:file:bg-blue-100'
            />
          </div>
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
                II WJO – uprawnia do obsługi wózków jezdniowych podnośnikowych z
                wyłączeniem specjalizowanych
              </div>
              <div className='text-tiny'>
                III WJO – uprawnia do obsługi wózków jezdniowych podnośnikowych
                prowadzonych i zdalnie sterowanych
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
            <CheckboxGroup label='Uprawnienia:'>
              <Checkbox value='3'>I WJO</Checkbox>
              <Checkbox value='2'>II WJO</Checkbox>
              <Checkbox value='1'>III WJO</Checkbox>
              <Checkbox value='20'>I S</Checkbox>
              <Checkbox value='10'>II S</Checkbox>
            </CheckboxGroup>
          </div>
        </Tooltip>
      </CardBody>

      <Divider />
      <CardFooter className='w-full justify-between'>
        <Link
          isExternal
          showAnchorIcon
          href='https://github.com/nextui-org/nextui'
        >
          Zaloguj się.
        </Link>
        <Button color='primary' size='md' className=' text-sm md:w-1/5'>
          Zarejestruj się
          <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}
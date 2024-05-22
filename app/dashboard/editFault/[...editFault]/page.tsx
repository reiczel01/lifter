'use client';
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
import { Textarea } from '@nextui-org/react';
import { ArrowRightIcon } from '@nextui-org/shared-icons';
import React from 'react';
import { useFormState } from 'react-dom';
import { registerFault } from '@/app/dashboard/equipment/[id]/handler';
import { editFault } from '@/app/dashboard/editFault/[...editFault]/handler';

interface paramsFault {
  params: {
    slug: string[];
  };
}

export default function EditFault({ params }: paramsFault) {
  const [formState, action] = useFormState(editFault, { message: '' });
  console.log('params', params.slug);
  return (
    <div className='flex w-full flex-col items-center '>
      <form className='w-1/2' action={action}>
        <Card className='mt-4 w-full items-center'>
          <CardHeader className='flex w-full flex-col items-center gap-4 md:flex-row'>
            <div className='flex flex-col pr-6'>
              <p className='text-xl'>Edycja usterki</p>
              <p className='text-lg text-default-500'>LIFTER</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className='flex w-full flex-col justify-center  px-10 md:w-full md:flex-row md:items-center'>
            <div className='w-full items-center'>
              <Input
                isRequired
                name='title'
                type='string'
                label='Tytuł'
                className='mt-4'
                fullWidth
              />
              <Textarea
                label='Opis usterki'
                name='description'
                type='string'
                className='mt-4 w-full'
              />
              <Textarea
                label='Opis rozwiazania'
                name='solution'
                type='string'
                placeholder='Opisz rozwiazanie...'
                className='mt-4 w-full'
              />
              <Input name='userId' className={'hidden'} />
              <Input name='id' className={'hidden'} />
              <Checkbox name='present' className='mt-4'>
                Czy usterka nadal występuje?
              </Checkbox>
            </div>
          </CardBody>

          <Divider />
          <CardFooter className='w-full justify-between'>
            <Link
              isExternal
              showAnchorIcon
              href='https://www.udt.gov.pl/rejestracja-urzadzenia'
            >
              Wymagania UDT
            </Link>
            <div>{formState.message}</div>
            <Button
              color='primary'
              type='submit'
              size='md'
              className=' text-sm md:w-1/5'
            >
              Zatwierdź zmiany
              <ArrowRightIcon />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

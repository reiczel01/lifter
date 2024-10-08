'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Link,
  Textarea,
} from '@nextui-org/react';
import { ArrowRightIcon } from '@nextui-org/shared-icons';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import {
  editFault,
  getFault,
} from '@/app/dashboard/editFault/[...editFault]/handler';
import { redirect, useParams, useRouter } from 'next/navigation';

export default function EditFault() {
  const params = useParams();
  const editFaultParams = Array.isArray(params.editFault)
    ? params.editFault
    : [];

  // Map and decode parameters in the expected order with default values
  const [
    id = '',
    userId = '',
    description = '',
    solution = '',
    title = '',
    present = '',
    equipmentId = '',
  ] = editFaultParams.map((param) => decodeURIComponent(param || ''));

  // Ensure that present is correctly interpreted as a boolean
  const [isPresent, setIsPresent] = React.useState(present === 'true');

  const [formState, action] = useFormState(editFault, { message: '' });
  const router = useRouter();

  const fault = getFault(parseInt(id, 10));

  useEffect(() => {
    if (formState.message === 'Uaktualniono usterkę') {
      router.replace(`/dashboard/equipment/${equipmentId}`);
    }
  }, [formState.message, router, equipmentId]);

  return (
    <div className='flex w-full flex-col items-center'>
      <form className='w-1/2' action={action}>
        <Card className='mt-4 w-full items-center'>
          <CardHeader className='flex w-full flex-col items-center gap-4 md:flex-row'>
            <div className='flex flex-col pr-6'>
              <p className='text-xl'>Edycja usterki</p>
              <p className='text-lg text-default-500'>LIFTER</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className='flex w-full flex-col justify-center px-10 md:w-full md:flex-row md:items-center'>
            <div className='w-full items-center'>
              <Input
                isRequired
                name='title'
                defaultValue={title}
                type='string'
                label='Tytuł'
                className='mt-4'
                fullWidth
              />
              <Textarea
                label='Opis usterki'
                name='description'
                defaultValue={description}
                type='string'
                className='mt-4 w-full'
              />
              <Textarea
                label='Opis rozwiązania'
                name='solution'
                defaultValue={solution === 'null' ? '' : solution}
                type='string'
                placeholder='Opisz rozwiązanie...'
                className='mt-4 w-full'
              />
              <Input name='userId' defaultValue={userId} className={'hidden'} />
              <Input name='id' defaultValue={id} className={'hidden'} />
              <Checkbox
                name='present'
                isSelected={isPresent}
                onValueChange={setIsPresent}
                defaultSelected={present === 'true'}
                value={isPresent ? 'true' : 'false'}
                className='mt-4'
              >
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
              className='text-sm md:w-1/5'
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

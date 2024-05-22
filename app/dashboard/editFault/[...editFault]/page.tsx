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
import { editFault } from '@/app/dashboard/editFault/[...editFault]/handler';
import { useParams, useRouter } from 'next/navigation';

export default function EditFault() {
  const params = useParams();
  const editFaultParams = Array.isArray(params.editFault)
    ? params.editFault
    : [];
  const decodedParams = editFaultParams.map((param) =>
    decodeURIComponent(param),
  );

  const [id, userId, description, solution, title, present, equipmentId] =
    decodedParams;
  const [formState, action] = useFormState(editFault, { message: '' });

  const [isPresent, setIsPresent] = React.useState(present === 'true');

  let solutionValue = solution;
  if (solution === 'null') {
    solutionValue = '';
  }
  console.log(present);

  const router = useRouter();
  useEffect(() => {
    if (formState.message === 'Uaktualniono usterkę') {
      const timer = setTimeout(() => {
        router.push(`/dashboard/equipment/${equipmentId}`);
      }, 4000);

      // Clean up the timer on unmount or if formState.message changes
      return () => clearTimeout(timer);
    }
  }, [formState.message, router]);
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
                label='Opis rozwiazania'
                name='solution'
                defaultValue={solutionValue}
                type='string'
                placeholder='Opisz rozwiazanie...'
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

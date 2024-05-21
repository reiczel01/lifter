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
import React from 'react';

export default function EditFault() {
  return (
    <div className='flex w-1/2 flex-col items-center bg-red-600'>
      <form>
        <Card className='mt-4 max-w-4xl items-center'>
          <CardHeader className='flex w-full flex-col items-center gap-4 md:flex-row'>
            <div className='flex flex-col pr-6'>
              <p className='text-xl'>Rejestracja sprzętu</p>
              <p className='text-lg text-default-500'>LIFTER</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className='flex w-full flex-col justify-center px-10 md:w-full md:flex-row md:items-center'>
            <div className='w-max items-center'>
              <Input
                isRequired
                name='title'
                type='string'
                label='Tytuł'
                className='mt-4'
              />
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
            <div></div>
            <Button
              color='primary'
              type='submit'
              size='md'
              className=' text-sm md:w-1/5'
            >
              Zarejestruj
              <ArrowRightIcon />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

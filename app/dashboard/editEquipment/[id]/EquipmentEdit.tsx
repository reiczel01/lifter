'use client';
import React, { useState } from 'react';
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
  Tooltip,
  Link,
} from '@nextui-org/react';
import QRCode from 'qrcode.react';
import { useFormState } from 'react-dom';
import { ArrowRightIcon } from '@nextui-org/shared-icons';
import editEquipment from '@/app/dashboard/editEquipment/[id]/submit';

interface EquipmentEditCardProps {
  id: string;
  registrationNumber: string;
  serialNumber: string;
  liftingCapacityKg: string;
  model: string;
  constructionYear: string;
  validityDate: string;
  protocolFilePath: string;
  decisionFilePath: string;
  manualFilePath: string;
  deviceSchematics: string;
  image: string;
  perms: string[];
}

const EquipmentEditCard: React.FC<EquipmentEditCardProps> = ({
  id,
  registrationNumber,
  serialNumber,
  liftingCapacityKg,
  model,
  constructionYear,
  validityDate,
  protocolFilePath,
  decisionFilePath,
  manualFilePath,
  deviceSchematics,
  image,
  perms,
}) => {
  const [formState, action] = useFormState(editEquipment, { message: '' });
  const [selectedPermissions, setSelectedPermissions] = useState(perms);

  const handlePermissionsChange = (selected: any) => {
    setSelectedPermissions(selected);
  };

  return (
    <div className='flex flex-col items-center'>
      <form action={action}>
        <Card className='mt-4 max-w-3xl items-center'>
          <CardHeader className='flex w-full flex-col items-center gap-4 md:flex-row'>
            <Image
              alt='nextui logo'
              height='max-h-20'
              radius='sm'
              src='../../../../Lifter-logo-only.png'
              width='w-auto'
            />
            <div className='flex flex-col pr-6'>
              <p className='text-xl'>Edycja sprzętu</p>
              <p className='text-lg text-default-500'>LIFTER</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className='flex w-full flex-col justify-center px-10 md:flex-row md:items-center'>
            <div className='items-center md:mr-8'>
              <Input name='id' className='hidden' defaultValue={id} />
              <Input
                isRequired
                name='image'
                type='string'
                defaultValue={image}
                label='Grafika'
                className='mt-4'
              />
              <Input
                isRequired
                name='registrationNumber'
                type='number'
                defaultValue={registrationNumber}
                label='Numer ewidencji'
                className='mt-4'
              />
              <Input
                isRequired
                name='serialNumber'
                type='text'
                defaultValue={serialNumber}
                label='Numer seryjny'
                className='mt-4'
              />
              <Input
                isRequired
                name='liftingCapacityKg'
                type='number'
                defaultValue={liftingCapacityKg}
                label='Udzwig w kg'
                className='mt-4'
              />
              <Input
                isRequired
                name='model'
                type='text'
                defaultValue={model}
                label='Model'
                className='mt-4'
              />
              <Input
                isRequired
                name='constructionYear'
                type='number'
                defaultValue={constructionYear}
                label='Rok produkcji'
                className='mt-4'
              />
            </div>
            <div className='items-center md:mr-8'>
              <Input
                isRequired
                name='validityDate'
                type='date'
                defaultValue={validityDate}
                label='Data ważności decyzji'
                className='mt-4'
              />
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Protokół wykonania czynności dozoru technicznego (url):
                </label>
                <Input
                  isRequired
                  name='protocolFilePath'
                  type='text'
                  className='mt-4'
                  defaultValue={protocolFilePath}
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Decyzja (url):
                </label>
                <Input
                  isRequired
                  name='decisionFilePath'
                  type='text'
                  className='mt-4'
                  defaultValue={decisionFilePath}
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Instrukcja obsługi (url):
                </label>
                <Input
                  isRequired
                  name='manualFilePath'
                  type='text'
                  className='mt-4'
                  defaultValue={manualFilePath}
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Schematy urządzenia (url):
                </label>
                <Input
                  isRequired
                  name='deviceSchematics'
                  type='text'
                  className='mt-4'
                  defaultValue={deviceSchematics}
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
                  <Checkbox value={'1'}>I WJO</Checkbox>
                  <Checkbox value={'2'}>II WJO</Checkbox>
                  <Checkbox value={'3'}>III WJO</Checkbox>
                  <Checkbox value={'4'}>I S</Checkbox>
                  <Checkbox value={'5'}>II S</Checkbox>
                </CheckboxGroup>
              </div>
            </Tooltip>
          </CardBody>

          <Divider />
          <CardFooter className='w-full justify-between'>
            <Link
              isExternal={true}
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
};

export default EquipmentEditCard;

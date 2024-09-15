'use client';
import { useFormState } from 'react-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Switch,
  Divider,
  Image,
  Input,
  Tooltip,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import updateUser, { fetchUser } from '@/app/dashboard/userEdit/[id]/handler';
import { ArrowRightIcon } from '@nextui-org/shared-icons';
import { redirect } from 'next/navigation';

export default function UserEdit({ params }: { params: { id: string } }) {
  const { id } = params;
  const [formState, action] = useFormState(updateUser, { message: '' });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>('operator'); // Domyślna rola: Operator
  const [password, setPassword] = useState<string>(''); // Puste hasło domyślnie
  const [passwordRetype, setPasswordRetype] = useState<string>(''); // Puste hasło domyślnie
  const [desabled, setDesabled] = useState<boolean>(false); // Stan dezaktywacji

  const handlePermissionsChange = (selected: string[]) => {
    setSelectedPermissions(selected);
  };

  if (formState.message === 'Użytkownik zedytowany') {
    redirect('/dashboard/userAdministration');
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const userData = await fetchUser(id);
          if (userData) {
            setUser(userData);
            setSelectedPermissions(
              userData.permissions.map((perm: any) => String(perm.id)),
            );
            setRole(userData.role || 'operator'); // Jeśli brak roli, ustaw na Operator
            setDesabled(userData.desabled || false); // Ustawienie stanu dezaktywacji
          } else {
            console.error('User not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.error('User ID is not provided');
      }
    };

    fetchData();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Formatowanie permissionsValidityDate do formatu YYYY-MM-DD
  const formattedDate = user.permissionsValidityDate
    ? new Date(user.permissionsValidityDate).toISOString().split('T')[0]
    : '';

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
              <p className='text-xl'>Edycja użytkownika</p>
              <p className='text-lg text-default-500'>LIFTER</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className='flex w-full flex-col justify-center px-10 md:flex-row md:items-center'>
            <div className='items-center md:mr-8'>
              <Input type='text' name='id' value={user.id} className='hidden' />
              <Input
                isRequired
                type='text'
                name='name'
                label='Imię'
                className='mt-4'
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <Input
                isRequired
                type='text'
                name='surname'
                label='Nazwisko'
                className='mt-4'
                value={user.surname}
                onChange={(e) => setUser({ ...user, surname: e.target.value })}
              />
              <Input
                isRequired
                type='email'
                name='email'
                label='Email'
                className='mt-4'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <Input
                name='password'
                type='password'
                label='Hasło'
                className='mt-4'
                placeholder='Zostaw puste, aby nie zmieniać'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                name='passwordRetype'
                type='password'
                label='Powtórz hasło'
                className='mt-4'
                placeholder='Zostaw puste, aby nie zmieniać'
                value={passwordRetype}
                onChange={(e) => setPasswordRetype(e.target.value)}
              />
            </div>
            <div className='items-center md:mr-8'>
              <Input
                isRequired
                type='text'
                name='licenceNumber'
                label='Numer uprawnień'
                className='mt-4'
                value={user.licenceNumber || ''}
                onChange={(e) =>
                  setUser({ ...user, licenceNumber: e.target.value })
                }
              />
              <Input
                isRequired
                type='number'
                name='peselNumber'
                label='Numer PESEL'
                className='mt-4'
                value={user.peselNumber || ''}
                onChange={(e) =>
                  setUser({ ...user, peselNumber: e.target.value })
                }
              />
              <Input
                isRequired
                type='date'
                name='permissionsValidityDate'
                label='Data ważności uprawnień'
                className='mt-4'
                value={formattedDate} // Ustawienie sformatowanej daty
                onChange={(e) =>
                  setUser({
                    ...user,
                    permissionsValidityDate: e.target.value,
                  })
                }
              />
              <div className='mt-3 gap-3'>
                <Select
                  label='Rola'
                  value={role}
                  name={'role'}
                  placeholder='Wybierz rolę'
                  selectedKeys={new Set([role])}
                  onSelectionChange={(keys) => {
                    const keyArray = Array.from(keys);
                    const selectedKey =
                      keyArray.length > 0 ? keyArray[0] : null;

                    if (selectedKey) {
                      setRole(selectedKey);
                      setUser({ ...user, role: selectedKey });
                    } else {
                      setRole(''); // Lub ustaw domyślną wartość, jeśli żadna nie została wybrana
                    }
                  }}
                >
                  <SelectItem key='admin'>Administrator</SelectItem>
                  <SelectItem key='operator'>Operator</SelectItem>
                  <SelectItem key='technician'>Technik</SelectItem>
                </Select>
              </div>
              <div className='mt-3 gap-3'>
                <Switch
                  name='desabled'
                  value={desabled.toString()}
                  isSelected={desabled}
                  onValueChange={(isSelected) => {
                    setDesabled(isSelected);
                  }}
                >
                  Dezaktywowany?
                </Switch>
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
            <div>{formState.message}</div>
            <Button
              type='submit'
              color='primary'
              size='md'
              className='text-sm md:w-1/5'
            >
              Zapisz zmiany
              <ArrowRightIcon />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

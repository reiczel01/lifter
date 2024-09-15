'use server';

import { db } from '@/db';
import { hash } from 'bcrypt';

export default async function updateUser(
  formState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  try {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const email = formData.get('email') as string;
    const licenceNumber = formData.get('licenceNumber') as string | null;
    const peselNumber = formData.get('peselNumber') as string | null;
    const permissionsValidityDate = formData.get('permissionsValidityDate')
      ? new Date(formData.get('permissionsValidityDate') as string)
      : null;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;
    console.log(role);
    // Pobranie desabled jako stringa i konwersja na boolean
    const desabledString = formData.get('desabled') as string;
    const desabled = desabledString === 'true'; // Konwersja na boolean

    console.log(desabled);

    const permissionsSelected = formData.getAll(
      'permissions',
    ) as unknown as number[];
    const permissionIds = permissionsSelected.map((id) => parseInt(String(id)));

    const permissions = await db.permission.findMany({
      where: {
        id: { in: permissionIds }, // Znajdź uprawnienia o podanych identyfikatorach
      },
    });

    const userData: any = {
      name,
      surname,
      email,
      licenceNumber,
      peselNumber,
      permissionsValidityDate,
      role,
      desabled, // Użyj przekonwertowanej wartości boolean
      permissions: {
        set: permissions.map((permission) => ({ id: permission.id })), // Poprawne przypisanie uprawnień
      },
    };

    if (password && password.trim().length > 0) {
      if (password.length < 3) {
        return { message: 'Hasło musi mieć co najmniej 3 znaki' };
      }
      userData.password = await hash(password, 10);
    }

    const user = await db.user.update({
      where: {
        id,
      },
      data: userData,
    });

    return { message: 'Użytkownik zedytowany' };
  } catch (e) {
    console.log(e);
    return { message: 'Błąd' };
  }
}

export async function fetchUser(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      permissions: true,
    },
  });
  return user;
}

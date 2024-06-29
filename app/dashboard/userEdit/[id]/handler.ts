'use server';

import { db } from '@/db';
import { fromDate } from '@internationalized/date';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
type FormState = {
  message: string;
};

export default async function createUser(
  formState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  try {
    console.log(formData);
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    if (!name || name.length < 3) {
      return { message: 'Imię musi mieć co najmniej 3 znaki' };
    }
    const surname = formData.get('surname') as string;
    if (!surname || surname.length < 3) {
      return { message: 'Nazwisko musi mieć co najmniej 3 znaki' };
    }
    const email = formData.get('email') as string;
    if (!email || email.length < 3) {
      return { message: 'Email musi mieć co najmniej 3 znaki' };
    }
    const licenceNumber = formData.get('licenceNumber') as string;
    if (!licenceNumber || licenceNumber.length < 3) {
      return { message: 'Numer uprawnień musi mieć co najmniej 3 znaki' };
    }
    const peselNumber = formData.get('peselNumber') as string;
    if (!peselNumber || peselNumber.length < 11) {
      return { message: 'Numer PESEL musi mieć co najmniej 11 znaki' };
    }
    const peselNumberInt = parseInt(peselNumber);
    const permissionsValidityDate = new Date(
      formData.get('permissionsValidityDate') as string,
    );
    if (permissionsValidityDate < new Date()) {
      return { message: 'Data ważności uprawnień musi być większa od obecnej' };
    }
    const permissionsSelected = formData.getAll(
      'permissions',
    ) as unknown as number[];
    const permissionIds = permissionsSelected.map((id) => parseInt(String(id)));

    const permissions = await db.permission.findMany({
      where: {
        id: { in: permissionIds }, // Znajdź uprawnienia o podanych identyfikatorach
      },
    });

    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        surname,
        email,

        licenceNumber,
        peselNumber: peselNumberInt,
        permissionsValidityDate,
        permissions: {
          connect: permissions.map((permission) => ({ id: permission.id })),
        },
      },
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
      id: id,
    },
    include: {
      permissions: true,
    },
  });
  console.log(user);
  return user;
}

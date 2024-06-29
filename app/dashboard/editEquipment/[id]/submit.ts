'use server';
import { db } from '@/db';
import { redirect } from 'next/navigation';

export default async function editEquipment(
  formState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  const id = formData.get('id') as string;
  const registrationNumber = formData.get('registrationNumber') as string;
  if (!registrationNumber || registrationNumber.length < 4) {
    return { message: 'Numer ewidencji musi mieć co najmniej 4 znaki' };
  }
  const serialNumber = formData.get('serialNumber') as string;
  if (!serialNumber || serialNumber.length < 4) {
    return { message: 'Numer seryjny musi mieć co najmniej 4 znaki' };
  }
  const liftingCapacityKg = parseInt(
    formData.get('liftingCapacityKg') as string,
  );
  if (liftingCapacityKg < 0) {
    return { message: 'Udźwig musi być większy od 0' };
  }
  const constructionYear = parseInt(formData.get('constructionYear') as string);
  if (constructionYear < 0) {
    return { message: 'Rok budowy musi być większy od 0' };
  }
  if (constructionYear > new Date().getFullYear()) {
    return { message: 'Rok budowy nie może być większy od obecnego roku' };
  }
  const validityDate = new Date(formData.get('validityDate') as string);
  if (validityDate < new Date()) {
    console.log(validityDate);
    return { message: 'Data ważności musi być większa od obecnej daty' };
  }
  const model = formData.get('model') as string;
  if (!model || model.length < 4) {
    return { message: 'Model musi mieć co najmniej 4 znaki' };
  }
  const image = formData.get('image') as string;
  if (!image) {
    return { message: 'Grafika jest wymagana' };
  }

  const protocolFilePath = formData.get('protocolFilePath') as string;
  if (!protocolFilePath || isURL(protocolFilePath)) {
    return { message: 'Nie prawidłowy link do protokołu' };
  }
  const decisionFilePath = formData.get('decisionFilePath') as string;
  if (!decisionFilePath || isURL(decisionFilePath)) {
    return { message: 'Nie prawidłowy link do decyzji' };
  }
  const deviceSchematics = formData.get('deviceSchematics') as string;
  if (!deviceSchematics || isURL(deviceSchematics)) {
    return { message: 'Nie prawidłowy link do schematów' };
  }
  const manualFilePath = formData.get('manualFilePath') as string;
  if (!manualFilePath || isURL(manualFilePath)) {
    return { message: 'Nie prawidłowy link do instrukcji' };
  }
  const permissionsSelected = formData.getAll(
    'permissions',
  ) as unknown as number[];
  const permissionIds = permissionsSelected.map((id) => parseInt(String(id)));
  try {
    // Pobierz obiekty uprawnień na podstawie wybranych identyfikatorów

    const permissions = await db.permission.findMany({
      where: {
        id: { in: permissionIds }, // Znajdź uprawnienia o podanych identyfikatorach
      },
    });
    console.log(permissions);

    // Utwórz nowy sprzęt w bazie danych z przypisanymi uprawnieniami
    const equipment = await db.equipment.update({
      where: {
        id: Number(id),
      },
      data: {
        registrationNumber,
        serialNumber,
        liftingCapacityKg,
        constructionYear,
        validityDate,
        model,
        image,
        protocolFilePath,
        decisionFilePath,
        deviceSchematics,
        manualFilePath,
        permissions: {
          connect: permissions.map((permission) => ({ id: permission.id })),
        },
      },
    });

    console.log(equipment);
  } catch (error) {
    console.error('Wystąpił błąd podczas tworzenia sprzętu:', error);
    return { message: 'Wystąpił błąd podczas tworzenia sprzętu' };
  }
  redirect(`/dashboard/equipment/${id}`);
}

function isURL(str: string) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return !urlRegex.test(str);
}

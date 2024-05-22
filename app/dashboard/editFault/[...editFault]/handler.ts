'use server';
import { db } from '@/db';

export async function editFault(
  formState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  const userId = formData.get('userId') as string;
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const solution = formData.get('solution') as string;
  console.log(formData.get('present'));
  const present = formData.get('present') as string;
  if (!id || !userId) {
    return { message: 'Brak identyfikatora usterki lub urzytkownika' };
  } else {
    const idNumber = parseInt(id);
    const presentBool = present === 'true';
    console.log(presentBool);
    const create = await db.fault.update({
      where: {
        id: idNumber,
      },
      data: {
        userId: userId,
        updatedAt: new Date(),
        title: title,
        description: description,
        solution: solution,
        present: presentBool,
      },
    });
    return { message: 'Uaktualniono usterkę' };
  }
}

'use server';
import { db } from '@/db';

export async function editTask(
  formState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  const isFinished = formData.get('isFinished') as string;
  if (!id) {
    return { message: 'Brak identyfikatora usterki lub urzytkownika' };
  } else {
    const idNumber = parseInt(id);
    const presentBool = isFinished === 'true';
    console.log(presentBool);
    const create = await db.tasks.update({
      where: {
        id: idNumber,
      },
      data: {
        updatedAt: new Date(),
        title: title,
        description: description,
        isFinished: presentBool,
      },
    });
    return { message: 'Uaktualniono zadanie' };
  }
}

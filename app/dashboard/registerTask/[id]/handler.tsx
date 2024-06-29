'use server';
import { db } from '@/db';

export async function registerTask(
  formState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  const userId = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  if (!userId) {
    return { message: 'Brak identyfikatora urzytkownika' };
  } else {
    const create = await db.tasks.create({
      data: {
        title: title,
        description: description,
        isFinished: false,
        isStarted: false,
        createdAt: new Date(),
        updatedBy: userId,
        userId: userId,
      },
    });
    return { message: 'Utworzono zadanie' };
  }
}

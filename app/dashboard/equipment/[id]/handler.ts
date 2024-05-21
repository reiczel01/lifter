'use server';
import { db } from '@/db';

export async function registerUserUsage(
  formState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  const userId = formData.get('userId') as string;
  const equipmentId = formData.get('equipmentId') as string;
  const comment = formData.get('comment') as string;
  const finalComment = comment.length === 0 ? 'Brak uwag' : comment;
  if (!equipmentId || !userId) {
    return { message: 'Brak identyfikatora sprzętu lub urzytkownika' };
  } else {
    const equipmentIdNumber = parseInt(equipmentId);
    const create = await db.userLog.create({
      data: {
        equipmentId: equipmentIdNumber,
        userId: formData.get('userId') as string,
        createdAt: new Date(),
        comment: finalComment,
      },
    });
    return { message: 'Zarejestrowano użycie sprzętu' };
  }
}

'use server';
import { db } from '@/db';
import { router } from 'next/client';

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

export async function registerFault(
  formState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  const userId = formData.get('userId') as string;
  const equipmentId = formData.get('equipmentId') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  if (!equipmentId || !userId) {
    return { message: 'Brak identyfikatora sprzętu lub urzytkownika' };
  } else {
    const equipmentIdNumber = parseInt(equipmentId);
    const create = await db.fault.create({
      data: {
        equipment: { connect: { id: equipmentIdNumber } },
        userId: userId,
        createdAt: new Date(),
        title: title,
        description: description,
        present: true,
      },
    });
    return { message: 'Zarejestrowano usterkę' };
  }
}

export async function deleteFault(id: number) {
  try {
    await db.fault.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log('Error przy usuwaniu usterki:', e);
  }
}

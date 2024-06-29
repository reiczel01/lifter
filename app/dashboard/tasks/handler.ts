'use server';
import { db } from '@/db';

export async function changeIsStartedTrue(id: number) {
  const edit = await db.tasks.update({
    where: {
      id: id,
    },
    data: {
      isStarted: true,
    },
  });
}
export async function changeIsStartedFalse(id: number) {
  const edit = await db.tasks.update({
    where: {
      id: id,
    },
    data: {
      isStarted: false,
    },
  });
}
export async function changeIsFinishedTrue(id: number) {
  const edit = await db.tasks.update({
    where: {
      id: id,
    },
    data: {
      isFinished: true,
    },
  });
}
export async function deleteTask(id: number) {
  const del = await db.tasks.delete({
    where: {
      id: id,
    },
  });
}

export async function updatedByFetch(id: string) {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  return user?.name + ' ' + user?.surname;
}

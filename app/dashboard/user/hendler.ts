'use server';

import { getSession } from '@/app/api/auth/session/route';
import { cookies } from 'next/headers';
import { db } from '@/db';

export default async function userUsageLog() {
  const session = await getSession();
  let data = { id: '' };
  if (session) {
    data = JSON.parse((cookies().get('user-data')?.value as string) || '{}');
  }
  const userLog = await db.userLog.findMany({
    where: {
      userId: data.id,
    },
    include: {
      equipment: {
        select: {
          registrationNumber: true,
          id: true,
          model: true,
        },
      },
    },
  });
  console.log(userLog);
  return userLog;
}

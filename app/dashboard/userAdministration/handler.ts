'use server';
import { db } from '@/db';

export async function usersFetch() {
  const allUsers = await db.user.findMany();
  console.log(allUsers);
  return allUsers;
}

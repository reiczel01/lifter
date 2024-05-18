import { signIn } from 'next-auth/react';
type FormState = {
  message: string;
};

export default async function loginUser(
  formState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  const email = formData.get('email') as string;
  if (!email || email.length < 3) {
    return { message: 'Email musi mieć co najmniej 3 znaki' };
  }
  const password = formData.get('password') as string;
  if (!password || password.length < 3) {
    return { message: 'Hasło musi mieć co najmniej 3 znaki' };
  }

  const response = await signIn('credentials', {
    email,
    password,
    redirect: true,
  });

  return { message: 'Zalogowano' };
}

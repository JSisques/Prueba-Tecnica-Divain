'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from '../interfaces/User';

const useAuth = () => {
  const { data: session, status } = useSession();

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    return result;
  };

  const getToken = () => {
    return session?.user?.accessToken; // Devolvemos el token desde la sesión
  };

  return { user: session?.user as User, status, signIn: handleSignIn, signOut, getToken };
};

export default useAuth;

'use server';

import { createClient } from '@rt/authentication/server';

export const signUp = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'customer',
          permission: [
            'customers:read',
            'customers:create',
            'customers:update',
            'customers:delete',
            'products:read',
            'products:create',
            'products:update',
            'products:delete',
            'dashboard:read',
            'dashboard:create',
            'dashboard:update',
            'dashboard:delete',
          ],
        },
      },
    });

    if (error) {
      console.log('Error signing up:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.log('Error signing up:', error);
    throw new Error('Failed to sign up');
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Error signing in:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.log('Error signing in:', error);
    throw new Error('Failed to sign in');
  }
};

export const signOut = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) {
      console.log('Error signing out:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.log('Error signing out:', error);
    throw new Error('Failed to sign out');
  }
};

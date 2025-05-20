'use client';
import { signIn } from '@rt/actions/user';
import { AuthForm } from '@rt/app/(auth)/_components/Forms/AuthForm';
import { createClient } from '@rt/authentication/client';
import { AppAbility, updateAbility } from '@rt/authorization/ability';
import { AbilityContext } from '@rt/authorization/Can';
import { setPermissions } from '@rt/utils/permission';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const { auth } = createClient();
  const ability = useContext(AbilityContext) as AppAbility;

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const data = await signIn(email, password);
      return data.user;
    },
    onSuccess: async (data) => {
      const permissions = data?.user_metadata?.permission ?? [];
      updateAbility(ability, setPermissions(permissions));

      if (data?.user_metadata?.role === 'customer') {
        await auth.signOut();
        router.replace('/login');
        return;
      }
      router.replace('/dashboard');
    },
  });
  return <AuthForm action={mutation.mutate} />;
}

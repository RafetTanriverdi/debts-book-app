'use server';

import { createClient } from '@rt/authentication/server';
import { prisma } from '@rt/lib/prisma';
import { createClient as createClientAdmin } from '@supabase/supabase-js';

const supabaseAdmin = createClientAdmin(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export default async function createUser({
  data,
}: {
  data: {
    name: string;
    phone: string;
    email: string;
    userId: string;
    password: string;
    permission: string[];
    address?: string;
    tcNo?: string;
  };
}) {
  const { auth } = await createClient();
  const { data: currentUser, error: currentUserError } = await auth.getUser();

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    email_confirm: true,
    phone: data.phone,
    phone_confirm: true,
    password: data.password,
    user_metadata: {
      role: 'business',
      name: data.name,
      phone: data.phone,
      address: data.address,
      tcNo: data.tcNo,
    },
  });

  if (!currentUserError && !error) {
    const user = await prisma.customers.create({
      data: {
        ...data,
        userId: currentUser?.user?.id,
      },
    });
    return user;
  }

  return null;
}

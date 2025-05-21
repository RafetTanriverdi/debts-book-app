'use server';

import { createClient } from '@rt/authentication/server';
import { prisma } from '@rt/lib/prisma';
import { createClient as createClientAdmin } from '@supabase/supabase-js';

const supabaseAdmin = createClientAdmin(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export async function listCustomers() {
  const { auth } = await createClient();
  const { data: currentUser, error: currentUserError } = await auth.getUser();
  if (currentUserError) {
    console.error('Error fetching current user:', currentUserError);
    throw new Error('Failed to fetch current user');
  }

  return await prisma.customers.findMany({
    where: { userId: currentUser?.user?.id },
    include: { debts: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createCustomer(data: {
  name: string;
  phone: string;
  email?: string;
  userId?: string;
  password?: string;
  address?: string;
  tcNo?: string;
}) {
  try {
    const { auth } = await createClient();
    const { data: currentUser, error: currentUserError } = await auth.getUser();
    const { error, data: userPool } = await supabaseAdmin.auth.admin.createUser(
      {
        email: data.email,
        user_metadata: {
          name: data.name,
          phone: data.phone,
          role: 'customer',
        },
      }
    );

    console.log('User creation response:', userPool);
    if (!error && !currentUserError) {
      const user = await prisma.customers.create({
        data: {
          ...data,
          userId: currentUser?.user?.id,
        },
      });

      console.log('User created successfully:', user);
      return user;
    }
  } catch (error) {
    console.log('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
}

export async function getCustomerById(customerId: string) {
  return await prisma.customers.findUnique({
    where: { id: customerId },
    include: { debts: true },
  });
}

export async function updateCustomer(
  customerId: string,
  data: {
    name?: string;
    phone?: string;
    email?: string;
  }
) {
  return await prisma.customers.update({
    where: { id: customerId },
    data,
  });
}

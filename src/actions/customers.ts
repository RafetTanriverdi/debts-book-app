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
  email: string;
  userId: string;
  password: string;
  address?: string;
  tcNo?: string;
}) {
  try {
    const { auth } = await createClient();
    const { data: currentUser } = await auth.getUser();
    await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      email_confirm: true,
      phone: data.phone,
      phone_confirm: true,
      password: data.password,
      user_metadata: {
        role: 'customer',
        name: data.name,
        phone: data.phone,
        address: data.address,
        tcNo: data.tcNo,
      },
    });

    const existingCustomer = await supabaseAdmin.auth.admin.listUsers({});
    const checkExistingCustomer = existingCustomer.data.users.filter(
      (user) => user.email === data.email
    );

    if (checkExistingCustomer.length > 0) {
      throw new Error('Customer with this email already exists');
    }

    if (!currentUser?.user?.id) {
      throw new Error('User ID is undefined');
    }

    return await prisma.customers.create({
      data: {
        ...data,
        userId: currentUser.user.id,
      },
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error(
      typeof error === 'string' ? error : 'An unknown error occurred'
    );
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
    address?: string;
    tcNo?: string;
  }
) {
  return await prisma.customers.update({
    where: { id: customerId },
    data,
  });
}

export async function deleteCustomer(customerId: string) {
  return await prisma.customers.delete({
    where: { id: customerId },
  });
}

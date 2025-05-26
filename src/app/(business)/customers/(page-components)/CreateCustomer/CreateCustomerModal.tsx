'use client';

import { createCustomer } from '@rt/actions/customers';
import { createClient } from '@rt/authentication/client';
import { Button } from '@rt/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rt/components/ui/dialog';
import { Input } from '@rt/components/ui/input';
import { Label } from '@rt/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function CreateCustomerModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleCreateCustomer = useMutation({
    mutationKey: ['createCustomer'],
    mutationFn: async (formData: FormData) => {
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const address = formData.get('address') as string;
      const tcKimlik = formData.get('tc') as string;
      const password = formData.get('password') as string;

      const { auth } = await createClient();
      const user = await auth.getUser();
      const userId = user?.data?.user?.id as string;

      if (!userId) {
        throw new Error('User ID is undefined');
      }

      const res = await createCustomer({
        name: name,
        email: email,
        phone: phone,
        address: address,
        tcNo: tcKimlik,
        userId: userId,
        password: password,
      });
      return res;
    },
    onSuccess: (data) => {
      console.log('Customer created successfully:', data);
      toast.success('Customer created successfully!', {
        description: `Customer ${data?.name} has been created.`,
      });
      queryClient.invalidateQueries({ queryKey: ['customerList'] });
    },
    onError: (error) => {
      toast.error('Failed to create customer', {
        description: error.message
          ? error.message
          : 'An unknown error occurred while creating the customer.',
      });
    },
  });

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Create Customer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Customer</DialogTitle>
        </DialogHeader>
        <form action={(e) => handleCreateCustomer.mutate(e)}>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name" className="mb-1.5">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your Name and Surname"
                type="text"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="mb-1.5">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your Phone Number"
                type="text"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="mb-1.5">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your Email"
                type="email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1.5">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your Password"
                type="password"
                required
              />
            </div>
            <div>
              <Label htmlFor="address" className="mb-1.5">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your Address"
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="tc" className="mb-1.5">
                TC Number
              </Label>
              <Input
                id="tc"
                name="tc"
                placeholder="Enter your TC Kimlik No"
                type="text"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant={'outline'}
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant={'default'}>
              {handleCreateCustomer.isPending ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

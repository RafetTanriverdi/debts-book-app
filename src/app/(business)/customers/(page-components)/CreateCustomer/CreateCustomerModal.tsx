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
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

export default function CreateCustomerModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCreateCustomer = useMutation({
    mutationKey: ['createCustomer'],
    mutationFn: async (formData: FormData) => {
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const address = formData.get('address') as string;
      const tcKimlik = formData.get('tc') as string;

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
      });
      return res;
    },
    onSuccess: (data) => {
      console.log('Customer created successfully', data);
    },
    onError: (error) => {
      console.log('Error creating customer:', error);
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
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant={'outline'}
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant={'default'}>
              {handleCreateCustomer.isPaused ? (
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

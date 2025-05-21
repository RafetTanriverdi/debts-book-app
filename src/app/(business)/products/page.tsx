'use client';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@rt/components/ui/button';
import { createProduct } from '@rt/actions/products';

function Products() {
  const mutation = useMutation({
    mutationKey: ['products'],
    mutationFn: async () => {
      await createProduct({
        title: 'Product 1',
        description: 'Product 1 description',
        userId: '1',
      });
    },
    onSuccess: () => {
      console.log('Product created successfully');
    },
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });

  return (
    <div>
      <Button
        onClick={() => mutation.mutate()}
        className="bg-blue-500 text-white"
      >
        Create Product
      </Button>
      Products
    </div>
  );
}

export default Products;

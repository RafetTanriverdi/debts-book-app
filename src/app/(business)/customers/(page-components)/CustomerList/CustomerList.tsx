'use client';

import { listCustomers } from '@rt/actions/customers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@rt/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function CustomerList() {
  const tableHead = [
    'Name',
    'Phone',
    'Email',
    'Total Debts',
    'Upadted',
    'Created',
  ];

  const { data } = useQuery({
    queryKey: ['customerList'],
    queryFn: async () => {
      const res = await listCustomers();
      return res;
    },
  });
  console.log('customerList', data);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHead.map((head, index) => (
            <TableHead key={index}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.updatedAt.toString()}</TableCell>
            <TableCell>{customer.createdAt.toString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

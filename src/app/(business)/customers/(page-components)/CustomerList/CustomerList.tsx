'use client';

import { listCustomers } from '@rt/actions/customers';
import { Skeleton } from '@rt/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@rt/components/ui/table';
import { shortDate } from '@rt/utils/dayjs-format';
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['customerList'],
    queryFn: async () => {
      const res = await listCustomers();
      return res;
    },
  });

  if (isLoading) {
    const skeletonRows = Array.from({ length: 12 }, (_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-7 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-7 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-7 w-40" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-7 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-7 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-7 w-32" />
        </TableCell>
      </TableRow>
    ));

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {tableHead.map((head, index) => (
              <TableHead key={index}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{skeletonRows}</TableBody>
      </Table>
    );
  }
  if (error) {
    return <div>Error loading customers: {error.message}</div>;
  }

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
            <TableCell>
              {customer.debts.reduce((acc, debt) => acc + debt.amount, 0)} TL
            </TableCell>
            <TableCell>{shortDate(customer.updatedAt.toString())}</TableCell>
            <TableCell>{shortDate(customer.createdAt.toString())}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

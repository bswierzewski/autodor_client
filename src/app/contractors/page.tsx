'use client';

import { Plus, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useGetContractors } from '@/lib/api/mtparts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Contractors() {
  const router = useRouter();
  const { data, refetch } = useGetContractors({
    query: {
      enabled: false
    }
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-5">
        <Input placeholder="Search by name" />
        <Button size="default" onClick={() => refetch()} variant="secondary">
          <RefreshCcw />
          <span className="ml-3 inline sm:hidden">Refresh</span>
        </Button>
        <Button size="default" onClick={() => router.push('/contractors/add')}>
          <Plus />
          <span className="ml-3 inline sm:hidden">Add</span>
        </Button>
      </div>
      <Separator className="my-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">Name</TableHead>
            <TableHead className="text-right">City</TableHead>
            <TableHead className="text-right">CraetedAt</TableHead>
            <TableHead className="text-right">Email</TableHead>
            <TableHead className="text-right">Nip</TableHead>
            <TableHead className="text-right">Street</TableHead>
            <TableHead className="text-right">ZipCode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((contractor) => (
            <TableRow key={contractor.id}>
              <TableCell className="text-right">{contractor.name}</TableCell>
              <TableCell className="text-right">{contractor.city}</TableCell>
              <TableCell className="text-right">{contractor.createdAt}</TableCell>
              <TableCell className="text-right">{contractor.email}</TableCell>
              <TableCell className="text-right">{contractor.nip}</TableCell>
              <TableCell className="text-right">{contractor.street}</TableCell>
              <TableCell className="text-right">{contractor.zipCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

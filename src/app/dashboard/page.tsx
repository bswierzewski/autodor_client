'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GetOrders } from '@/hooks/queries';
import { useQueryClient } from '@tanstack/react-query';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { data } = GetOrders({
    params: { query: { dateFrom: new Date('2024-04-09').toDateString(), dateTo: '2024-04-09' } }
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">Id</TableHead>
          <TableHead className="text-right">Data</TableHead>
          <TableHead className="text-right">Ilość</TableHead>
          <TableHead className="text-right">Numer</TableHead>
          <TableHead className="text-right">Osoba</TableHead>
          <TableHead className="text-right">Cena</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((setting) => (
          <TableRow key={setting.id}>
            <TableCell className="text-right">{setting.id}</TableCell>
            <TableCell className="text-right">{setting.date}</TableCell>
            <TableCell className="text-right">{setting.itemsCount}</TableCell>
            <TableCell className="text-right">{setting.number}</TableCell>
            <TableCell className="text-right">{setting.person}</TableCell>
            <TableCell className="text-right">{setting.totalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

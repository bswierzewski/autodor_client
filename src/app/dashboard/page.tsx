'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GetOrders } from '@/hooks/queries';
import { DatePicker } from '@/components/DatePicker';
import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function Dashboard() {
  var daysInSecond = 7 * 24 * 60 * 60 * 1000;
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date(Date.now() - daysInSecond));
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());

  const { data, refetch } = GetOrders({
    params: { query: { dateFrom: dateFrom?.toDateString() ?? '', dateTo: dateTo?.toDateString() ?? '' } },
    reactQuery: {
      enabled: false
    }
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-5">
        <DatePicker date={dateFrom} setDate={setDateFrom} />
        <DatePicker date={dateTo} setDate={setDateTo} />
        <Button size="default" onClick={() => refetch()}>
          <RefreshCcw />
          <span className="ml-3 inline sm:hidden">Refresh</span>
        </Button>
      </div>
      <Separator className="my-4" />
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
    </div>
  );
}

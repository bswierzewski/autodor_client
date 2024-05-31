import { useOrdersStore } from '@/stores/orders';
import { RotateCw } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { useGetOrders } from '@/lib/api/mtparts';

import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function OrdersTable() {
  var daysInSecond = 7 * 24 * 60 * 60 * 1000;

  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date(Date.now() - daysInSecond));
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());
  const [checked, setChecked] = useState<boolean>(false);

  const toggleOrder = useOrdersStore((state) => state.toggleOrder);
  const toggleOrders = useOrdersStore((state) => state.toggleOrders);
  const searchTerm = useOrdersStore((state) => state.searchTerm);
  const setSearchTerm = useOrdersStore((state) => state.setSearchTerm);
  const orders = useOrdersStore((state) => state.orders);
  const setOrders = useOrdersStore((state) => state.setOrders);

  const { data, refetch, isFetching } = useGetOrders(
    {
      dateFrom: dateFrom?.toDateString() ?? '',
      dateTo: dateTo?.toDateString() ?? ''
    },
    {
      query: {
        enabled: false,
        gcTime: 0
      }
    }
  );

  useEffect(() => {
    setOrders(data);
  }, [data]);

  useEffect(() => {
    toggleOrders(checked);
  }, [checked]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5">
        <DatePicker date={dateFrom} setDate={setDateFrom} label="Date from" />
        <DatePicker date={dateTo} setDate={setDateTo} label="Date to" />
        <Button className="md:mt-6" disabled={isFetching} size="default" onClick={() => refetch()}>
          <RotateCw className={isFetching ? 'animate-spin' : ''} />
          <span className="ml-3 inline md:hidden">Refresh</span>
        </Button>
      </div>
      <Input
        className="my-2"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                onCheckedChange={() => {
                  setChecked(!checked);
                }}
                checked={checked}
              />
            </TableHead>
            <TableHead className="text-right">Id</TableHead>
            <TableHead className="text-right">Date</TableHead>
            <TableHead className="text-right">Items count</TableHead>
            <TableHead className="text-right">Number</TableHead>
            <TableHead className="text-right">Person</TableHead>
            <TableHead className="text-right">Total price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders
            .filter((order) => order.isVisible)
            .map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    id={order.id ?? ''}
                    onCheckedChange={() => toggleOrder(order)}
                    checked={order.isSelected}
                    className="mb-[6px]"
                  />
                </TableCell>
                <TableCell className="text-right">{order.id}</TableCell>
                <TableCell className="text-right">{moment(order.date).format('YYYY-MM-DD')}</TableCell>
                <TableCell className="text-right">{order.itemsCount}</TableCell>
                <TableCell className="text-right">{order.number}</TableCell>
                <TableCell className="text-right">{order.person}</TableCell>
                <TableCell className="text-right">{order.totalPrice?.toFixed(2)} zł</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

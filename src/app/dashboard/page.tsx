'use client';

import { cn } from '@/lib/utils';
import { BookPlus, Check, ChevronsUpDown, RefreshCcw } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

import { Contractor, useCreateInvoice, useGetContractors, useGetOrders } from '@/lib/api/mtparts';

import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Dashboard() {
  var daysInSecond = 7 * 24 * 60 * 60 * 1000;

  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date(Date.now() - daysInSecond));
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [issueDate, setIssueDate] = useState<Date | undefined>(new Date());
  const [saleDate, setSaleDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<Contractor>();
  const [invoiceNumber, setInvoiceNumber] = useState<number>(0);

  const {
    data,
    refetch,
    isFetching: isGetOrdersFetching
  } = useGetOrders(
    {
      dateFrom: dateFrom?.toDateString() ?? '',
      dateTo: dateTo?.toDateString() ?? ''
    },
    {
      query: {
        enabled: false
      }
    }
  );
  const { data: contractors } = useGetContractors();
  const { mutate } = useCreateInvoice();

  const handleCheckboxChange = (orderId: string) => {
    setSelectedOrders((prevSelectedOrders) => {
      const updatedSelectedOrders = new Set(prevSelectedOrders);
      if (updatedSelectedOrders.has(orderId)) {
        updatedSelectedOrders.delete(orderId);
      } else {
        updatedSelectedOrders.add(orderId);
      }
      return updatedSelectedOrders;
    });
  };

  const handleCreateInvoice = () => {
    const selectedOrderDetails = filteredOrders?.filter((order) => selectedOrders.has(order.id ?? '')) ?? [];
    mutate({
      data: {
        orders: selectedOrderDetails,
        contractor: selectedContractor,
        invoiceNumber: invoiceNumber,
        issueDate: moment(issueDate).format(),
        saleDate: moment(saleDate).format()
      }
    });
  };

  const filteredOrders = data?.filter((order) => order.person?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <Input placeholder="Search by name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <div className="flex flex-col sm:flex-row gap-5">
        <DatePicker date={dateFrom} setDate={setDateFrom} label="Date from" />
        <DatePicker date={dateTo} setDate={setDateTo} label="Date to" />
        <Button className="sm:mt-6" disabled={isGetOrdersFetching} size="default" onClick={() => refetch()}>
          <RefreshCcw className={cn(isGetOrdersFetching ? 'animate-spin' : '')} />
          <span className="ml-3 inline sm:hidden">Refresh</span>
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 mt-2">
        <div className="flex-1">
          <Label>Invoice number</Label>
          <Input
            placeholder="Invoice number"
            value={invoiceNumber}
            type="number"
            onChange={(e) => setInvoiceNumber(Number(e.target.value))}
          />
        </div>
        <DatePicker date={issueDate} setDate={setIssueDate} label="Issue date" />
        <DatePicker date={saleDate} setDate={setSaleDate} label="Sale date" />
        <div className="flex-1 flex flex-col gap-2">
          <Label>Contractor</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="flex-1 justify-between">
                {selectedContractor?.id ? selectedContractor.name : 'Select contractor...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search contractor..." />
                <CommandEmpty>No contractor found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {contractors?.map((contractor) => (
                      <CommandItem
                        key={contractor.id}
                        value={contractor.id ?? ''}
                        onSelect={() => {
                          setOpen(false);
                          setSelectedContractor(contractor);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedContractor?.id === contractor.id ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {contractor.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button className="sm:mt-6" size="default" onClick={handleCreateInvoice}>
          <BookPlus />
          <span className="ml-3 inline sm:hidden">Add</span>
        </Button>
      </div>
      <Separator className="my-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="text-right">Id</TableHead>
            <TableHead className="text-right">Date</TableHead>
            <TableHead className="text-right">Items count</TableHead>
            <TableHead className="text-right">Number</TableHead>
            <TableHead className="text-right">Person</TableHead>
            <TableHead className="text-right">Total price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox
                  id={order.id ?? ''}
                  onCheckedChange={() => handleCheckboxChange(order.id ?? '')}
                  checked={selectedOrders.has(order.id ?? '')}
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
    </div>
  );
}

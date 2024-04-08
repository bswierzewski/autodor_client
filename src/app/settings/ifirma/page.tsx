'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DeleteIFirmaSetting } from '@/hooks/mutations';
import { GetiFirmaSettings } from '@/hooks/queries';
import { useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';

export default function IFirmaSettingsPage() {
  const queryClient = useQueryClient();
  const { data } = GetiFirmaSettings({});

  const { mutate } = DeleteIFirmaSetting({
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [] });
    }
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">Email</TableHead>
          <TableHead className="text-right">Faktura</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((setting) => (
          <TableRow key={setting.id}>
            <TableCell className="text-right">{setting.email}</TableCell>
            <TableCell className="text-right">{setting.fakturaApiKey}</TableCell>
            <TableCell className="text-right">
              <Button
                onClick={() =>
                  mutate({
                    params: {
                      path: {
                        id: setting.id ?? 0
                      }
                    }
                  })
                }
                variant="ghost"
                size="icon"
              >
                <Trash size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

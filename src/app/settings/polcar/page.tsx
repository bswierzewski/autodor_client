'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DeletePolcarSetting } from '@/hooks/mutations';
import { GetPolcarSettings } from '@/hooks/queries';
import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PolcarSettingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = GetPolcarSettings({});

  const { mutate } = DeletePolcarSetting({
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [] });
    }
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">Branch Id</TableHead>
          <TableHead className="text-right">Distributor code</TableHead>
          <TableHead className="text-right">Language Id</TableHead>
          <TableHead className="text-right">Login</TableHead>
          <TableHead className="text-right">Password</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((setting) => (
          <TableRow key={setting.id}>
            <TableCell className="text-right">{setting.branchId}</TableCell>
            <TableCell className="text-right">{setting.distributorCode}</TableCell>
            <TableCell className="text-right">{setting.languageId}</TableCell>
            <TableCell className="text-right">{setting.login}</TableCell>
            <TableCell className="text-right">{setting.password}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => router.push(`/settings/polcar/${setting.id}`)} variant="ghost" size="icon">
                <Edit size={20} />
              </Button>
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

'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DeleteUserSetting } from '@/hooks/mutations';
import { GetUserSettings } from '@/hooks/queries';
import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserSettingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = GetUserSettings({});

  const { mutate } = DeleteUserSetting({
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [] });
    }
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">branchId</TableHead>
          <TableHead className="text-right">collectionName</TableHead>
          <TableHead className="text-right">databaseName</TableHead>
          <TableHead className="text-right">distributorCode</TableHead>
          <TableHead className="text-right">email</TableHead>
          <TableHead className="text-right">fakturaEmail</TableHead>
          <TableHead className="text-right">languageId</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((setting) => (
          <TableRow key={setting.id}>
            <TableCell className="text-right">{setting.branchId}</TableCell>
            <TableCell className="text-right">{setting.collectionName}</TableCell>
            <TableCell className="text-right">{setting.databaseName}</TableCell>
            <TableCell className="text-right">{setting.distributorCode}</TableCell>
            <TableCell className="text-right">{setting.email}</TableCell>
            <TableCell className="text-right">{setting.fakturaEmail}</TableCell>
            <TableCell className="text-right">{setting.languageId}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => router.push(`/settings/user/${setting.id}`)} variant="ghost" size="icon">
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

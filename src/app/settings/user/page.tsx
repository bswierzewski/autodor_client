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
          <TableHead className="text-right">Auth0</TableHead>
          <TableHead className="text-right">Polcar</TableHead>
          <TableHead className="text-right">MongoDB</TableHead>
          <TableHead className="text-right">iFirma</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((setting) => (
          <TableRow key={setting.id}>
            <TableCell className="text-right">{setting.auth0Id}</TableCell>
            <TableCell className="text-right">{setting.polcarDistributorCode}</TableCell>
            <TableCell className="text-right">{setting.mongoDBCollection}</TableCell>
            <TableCell className="text-right">{setting.iFirmaEmail}</TableCell>
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

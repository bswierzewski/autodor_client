'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DeleteMongoDBSetting } from '@/hooks/mutations';
import { GetMongoDBSettings } from '@/hooks/queries';
import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MongoDBSettingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = GetMongoDBSettings({});

  const { mutate } = DeleteMongoDBSetting({
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [] });
    }
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">Collection name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((setting) => (
          <TableRow key={setting.id}>
            <TableCell className="text-right">{setting.collectionName}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => router.push(`/settings/mongodb/${setting.id}`)} variant="ghost" size="icon">
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

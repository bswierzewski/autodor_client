'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateMongoDBSetting } from '@/hooks/mutations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  collectionName: z.string().min(1)
});

export type MongoDBFormSchema = z.infer<typeof schema>;

export default function MongoDBCreateForm() {
  const router = useRouter();
  const { mutate } = CreateMongoDBSetting({
    onSuccess() {
      router.back();
    }
  });

  const { handleSubmit, register } = useForm<MongoDBFormSchema>({
    resolver: zodResolver(schema)
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({
          body: {
            collectionName: data.collectionName
          }
        })
      )}
      className="mt-5"
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="collectionName">Nazwa kolekcji</Label>
          <Input id="collectionName" placeholder="Nazwa kolekcji" {...register('collectionName')} />
        </div>
      </div>
      <div className="flex mt-5 gap-5">
        <Button className="flex-1" type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button className="flex-1" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}

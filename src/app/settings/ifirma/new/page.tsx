'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateIFirmaSetting } from '@/hooks/mutations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().min(1),
  faktura: z.string().min(1)
});

export type iFirmaFormSchema = z.infer<typeof schema>;

export default function IFirmaCreateForm() {
  const router = useRouter();
  const { mutate } = CreateIFirmaSetting({
    onSuccess() {
      router.back();
    }
  });

  const { handleSubmit, register } = useForm<iFirmaFormSchema>({
    resolver: zodResolver(schema)
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({
          body: {
            user: data.email,
            fakturaKey: data.faktura
          }
        })
      )}
      className="mt-5"
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Email" {...register('email')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="faktura">Faktura</Label>
          <Input id="faktura" placeholder="Faktura" {...register('faktura')} />
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

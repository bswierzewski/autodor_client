'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type Props = {
  mode: 'create' | 'update';
  onSubmit: SubmitHandler<iFirmaFormSchema>;
  defaultValues?: iFirmaFormSchema;
  isPending: boolean;
};

const schema = z.object({
  email: z.string().min(1),
  faktura: z.string().min(1)
});

export type iFirmaFormSchema = z.infer<typeof schema>;

export default function IFirmaForm({ mode, onSubmit, defaultValues, isPending }: Props) {
  const router = useRouter();

  const { handleSubmit, register } = useForm<iFirmaFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Email" {...register('email')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="faktura">Faktura - api key</Label>
          <Input id="faktura" placeholder="Faktura - api key" {...register('faktura')} />
        </div>
      </div>
      <div className="flex mt-5 gap-5">
        <Button className="flex-1" type="button" variant="outline" onClick={() => router.back()}>
          Anuluj
        </Button>
        {isPending ? (
          <Button disabled className="flex-1">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="flex-1">{mode === 'create' ? 'Add' : 'Update'}</Button>
        )}
      </div>
    </form>
  );
}

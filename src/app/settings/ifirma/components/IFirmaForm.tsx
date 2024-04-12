'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormButtons from '../../components/FormButtons';
import * as z from 'zod';

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
          <Label htmlFor="faktura">Invoice - api key</Label>
          <Input id="faktura" placeholder="Invoice - api key" {...register('faktura')} />
        </div>
      </div>
      <FormButtons isPending={isPending} mode={mode} />
    </form>
  );
}

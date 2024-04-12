'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormButtons from '../../components/FormButtons';
import * as z from 'zod';

type Props = {
  mode: 'create' | 'update';
  onSubmit: SubmitHandler<polcarFormSchema>;
  defaultValues?: polcarFormSchema;
  isPending: boolean;
};

const schema = z.object({
  branchId: z.number().positive(),
  distributorCode: z.string().min(1),
  languageId: z.number().positive(),
  login: z.string().min(1),
  password: z.string().min(1)
});

export type polcarFormSchema = z.infer<typeof schema>;

export default function PolcarForm({ mode, onSubmit, defaultValues, isPending }: Props) {
  const { handleSubmit, register } = useForm<polcarFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="branchId">Branch Id</Label>
          <Input
            type="number"
            id="branchId"
            placeholder="Branch Id"
            {...register('branchId', { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="distributorCode">Distributor code</Label>
          <Input id="distributorCode" placeholder="Distributor code" {...register('distributorCode')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="languageId">Language Id</Label>
          <Input
            type="number"
            id="languageId"
            placeholder="Language Id"
            {...register('languageId', { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="login">Login</Label>
          <Input id="login" placeholder="Login" {...register('login')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="Password" {...register('password')} />
        </div>
      </div>
      <FormButtons isPending={isPending} mode={mode} />
    </form>
  );
}

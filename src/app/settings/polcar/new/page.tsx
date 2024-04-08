'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreatePolcarSetting } from '@/hooks/mutations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  branchId: z.number().positive(),
  distributorCode: z.string().min(1),
  languageId: z.number().positive(),
  login: z.string().min(1),
  password: z.string().min(1)
});

export type PolcarFormSchema = z.infer<typeof schema>;

export default function PolcarCreateForm() {
  const router = useRouter();
  const { mutate } = CreatePolcarSetting({
    onSuccess() {
      router.back();
    }
  });

  const { handleSubmit, register } = useForm<PolcarFormSchema>({
    resolver: zodResolver(schema)
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({
          body: {
            branchId: data.branchId,
            distributorCode: data.distributorCode,
            languageId: data.languageId,
            login: data.login,
            password: data.password
          }
        })
      )}
      className="mt-5"
    >
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

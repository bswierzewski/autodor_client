'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateContractor } from '@/lib/api/mtparts';

import FormButtons from '@/components/FormButtons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  name: z.string().min(1),
  city: z.string().min(1),
  street: z.string().min(1),
  nip: z.string().min(1),
  zipCode: z.string().min(1),
  email: z.string().min(1)
});

export type contractorSchema = z.infer<typeof schema>;

export default function AddContractor() {
  const router = useRouter();
  const { mutate, isPending } = useCreateContractor({
    mutation: {
      onSuccess() {
        router.back();
      }
    }
  });
  const { handleSubmit, register } = useForm<contractorSchema>({
    resolver: zodResolver(schema)
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({
          data: {
            city: data.city,
            email: data.email,
            name: data.name,
            nip: data.nip,
            street: data.street,
            zipCode: data.zipCode
          }
        })
      )}
      className="mt-5"
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name" {...register('name')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="city" {...register('city')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="street">Street</Label>
          <Input id="street" placeholder="street" {...register('street')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="nip">NIP</Label>
          <Input id="nip" placeholder="NIP" {...register('nip')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="zipCode">ZipCode</Label>
          <Input id="zipCode" placeholder="00-000" {...register('zipCode')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="email" {...register('email')} />
        </div>
      </div>
      <FormButtons isPending={isPending} mode="create" />
    </form>
  );
}

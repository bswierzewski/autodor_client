'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormButtons from '../../components/FormButtons';
import * as z from 'zod';

type Props = {
  mode: 'create' | 'update';
  onSubmit: SubmitHandler<mongoDBFormSchema>;
  defaultValues?: mongoDBFormSchema;
  isPending: boolean;
};

const schema = z.object({
  collectionName: z.string().min(1)
});

export type mongoDBFormSchema = z.infer<typeof schema>;

export default function MongoDBForm({ mode, onSubmit, defaultValues, isPending }: Props) {
  const { handleSubmit, register } = useForm<mongoDBFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="collectionName">Collection</Label>
          <Input id="collectionName" placeholder="Collection name" {...register('collectionName')} />
        </div>
      </div>
      <FormButtons isPending={isPending} mode={mode} />
    </form>
  );
}

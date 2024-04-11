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
  onSubmit: SubmitHandler<mongoDBFormSchema>;
  defaultValues?: mongoDBFormSchema;
  isPending: boolean;
};

const schema = z.object({
  collectionName: z.string().min(1)
});

export type mongoDBFormSchema = z.infer<typeof schema>;

export default function MongoDBForm({ mode, onSubmit, defaultValues, isPending }: Props) {
  const router = useRouter();

  const { handleSubmit, register } = useForm<mongoDBFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="collectionName">Nazwa kolekcji</Label>
          <Input id="collectionName" placeholder="Nazwa kolekcji" {...register('collectionName')} />
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

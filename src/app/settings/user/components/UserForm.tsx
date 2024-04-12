'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetMongoDBSettings, GetPolcarSettings, GetiFirmaSettings } from '@/hooks/queries';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormButtons from '../../components/FormButtons';
import * as z from 'zod';

type Props = {
  mode: 'create' | 'update';
  onSubmit: SubmitHandler<UserFormSchema>;
  defaultValues?: UserFormSchema;
  isPending: boolean;
};

const schema = z.object({
  auth0Id: z.string().min(1),
  iFirmaSettingId: z.number().positive(),
  mongoDBSettingId: z.number().positive(),
  polcarSettingId: z.number().positive()
});

export type UserFormSchema = z.infer<typeof schema>;

export default function UserForm({ defaultValues, mode, isPending, onSubmit }: Props) {
  const { data: mongodbSettings } = GetMongoDBSettings({});
  const { data: polcarSettings } = GetPolcarSettings({});
  const { data: iFirmaSettings } = GetiFirmaSettings({});

  const { handleSubmit, register, setValue, getValues } = useForm<UserFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="grid w-full items-center gap-4">
        {mode === 'create' && (
          <div className="flex flex-col space-y-2">
            <Label htmlFor="auth0Id">Auth0 Id</Label>
            <Input id="auth0Id" placeholder="Auth0" {...register('auth0Id')} />
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="iFirmaSettingId">iFirma</Label>
          <Select
            defaultValue={getValues('iFirmaSettingId')?.toString()}
            onValueChange={(value) => setValue('iFirmaSettingId', Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select iFirma setting" />
            </SelectTrigger>
            <SelectContent>
              {iFirmaSettings?.map((setting) => (
                <SelectItem key={setting.id} value={setting.id?.toString() ?? ''}>
                  {setting.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="mongoDBSettingId">MongoDB</Label>
          <Select
            defaultValue={getValues('mongoDBSettingId')?.toString()}
            onValueChange={(value) => setValue('mongoDBSettingId', Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select MongoDB setting" />
            </SelectTrigger>
            <SelectContent>
              {mongodbSettings?.map((setting) => (
                <SelectItem key={setting.id} value={setting.id?.toString() ?? ''}>
                  {setting.collectionName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="polcarSettingId">Polcar</Label>
          <Select
            defaultValue={getValues('polcarSettingId')?.toString()}
            onValueChange={(value) => setValue('polcarSettingId', Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select polcar setting" />
            </SelectTrigger>
            <SelectContent>
              {polcarSettings?.map((setting) => (
                <SelectItem key={setting.id} value={setting.id?.toString() ?? ''}>
                  {setting.distributorCode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <FormButtons isPending={isPending} mode={mode} />
    </form>
  );
}

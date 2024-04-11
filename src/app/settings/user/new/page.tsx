'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateUserSetting } from '@/hooks/mutations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetMongoDBSettings, GetPolcarSettings, GetiFirmaSettings } from '@/hooks/queries';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as z from 'zod';

const schema = z.object({
  auth0Id: z.string().min(1),
  iFirmaSettingId: z.number().positive(),
  mongoDBSettingId: z.number().positive(),
  polcarSettingId: z.number().positive()
});

export type UserFormSchema = z.infer<typeof schema>;

export default function UserCreateForm() {
  const router = useRouter();
  const { data: mongodbSettings } = GetMongoDBSettings({});
  const { data: polcarSettings } = GetPolcarSettings({});
  const { data: iFirmaSettings } = GetiFirmaSettings({});

  const { mutate } = CreateUserSetting({
    onSuccess() {
      router.back();
    }
  });

  const { handleSubmit, register, setValue, formState } = useForm<UserFormSchema>({
    resolver: zodResolver(schema)
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({
          body: {
            auth0Id: data.auth0Id,
            iFirmaSettingId: data.iFirmaSettingId,
            mongoDBSettingId: data.mongoDBSettingId,
            polcarSettingId: data.polcarSettingId
          }
        })
      )}
      className="mt-5"
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="auth0Id">Auth0 Id</Label>
          <Input id="auth0Id" placeholder="Auth0" {...register('auth0Id')} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="iFirmaSettingId">iFirma</Label>
          <Select onValueChange={(value) => setValue('iFirmaSettingId', Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz ustawienie konta iFirma" />
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
          <Select onValueChange={(value) => setValue('mongoDBSettingId', Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz nazwę kolekcji MongoDB" />
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
          <Select onValueChange={(value) => setValue('polcarSettingId', Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz ustawienie konta polcar" />
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

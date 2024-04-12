'use client';

import { useRouter } from 'next/navigation';
import { UpdateUserSetting } from '@/hooks/mutations';
import { GetUserSetting } from '@/hooks/queries';
import UserForm from '../components/UserForm';

export default function UserEditForm({ params }: { params: { id: number } }) {
  const router = useRouter();
  const { data, isPending } = GetUserSetting({ params: { path: { id: params.id } }, reactQuery: { gcTime: 0 } });
  const { mutate } = UpdateUserSetting({
    onSuccess() {
      router.back();
    }
  });

  if (!data) return <h1>Data loading...</h1>;

  return (
    <UserForm
      mode="update"
      isPending={isPending}
      defaultValues={{
        auth0Id: data.auth0Id?.toString() ?? '',
        iFirmaSettingId: data.iFirmaSettingId ?? 0,
        mongoDBSettingId: data.mongoDBSettingId ?? 0,
        polcarSettingId: data.polcarSettingId ?? 0
      }}
      onSubmit={(data) => {
        return mutate({
          params: {
            path: {
              id: params.id
            }
          },
          body: {
            id: params.id,
            iFirmaSettingId: data.iFirmaSettingId,
            mongoDBSettingId: data.mongoDBSettingId,
            polcarSettingId: data.polcarSettingId
          }
        });
      }}
    />
  );
}

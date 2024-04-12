'use client';

import { useRouter } from 'next/navigation';
import { CreateUserSetting } from '@/hooks/mutations';
import UserForm from '../components/UserForm';

export default function UserCreateForm() {
  const router = useRouter();
  const { mutate, isPending } = CreateUserSetting({
    onSuccess() {
      router.back();
    }
  });

  return (
    <UserForm
      mode="create"
      isPending={isPending}
      onSubmit={(data) => {
        mutate({
          body: {
            auth0Id: data.auth0Id,
            iFirmaSettingId: data.iFirmaSettingId,
            mongoDBSettingId: data.mongoDBSettingId,
            polcarSettingId: data.polcarSettingId
          }
        });
      }}
    />
  );
}

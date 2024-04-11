'use client';

import { useRouter } from 'next/navigation';
import { CreatePolcarSetting } from '@/hooks/mutations';
import PolcarForm from '../components/PolcarForm';

export default function PolcarCreateForm() {
  const router = useRouter();
  const { mutate, isPending } = CreatePolcarSetting({
    onSuccess() {
      router.back();
    }
  });

  return (
    <PolcarForm
      mode="create"
      isPending={isPending}
      onSubmit={(data) => {
        mutate({
          body: {
            branchId: data.branchId,
            distributorCode: data.distributorCode,
            languageId: data.languageId,
            login: data.login,
            password: data.password
          }
        });
      }}
    />
  );
}

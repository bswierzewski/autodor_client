'use client';

import { useRouter } from 'next/navigation';
import { UpdatePolcarSetting } from '@/hooks/mutations';
import { GetPolcarSetting } from '@/hooks/queries';
import PolcarForm from '../components/PolcarForm';

export default function PolcarEditForm({ params }: { params: { id: number } }) {
  const router = useRouter();
  const { data, isPending } = GetPolcarSetting({ params: { path: { id: params.id } }, reactQuery: { gcTime: 0 } });
  const { mutate } = UpdatePolcarSetting({
    onSuccess() {
      router.back();
    }
  });

  if (!data) return <h1>Data loading...</h1>;

  return (
    <PolcarForm
      mode="update"
      isPending={isPending}
      defaultValues={{
        branchId: data.branchId ?? 0,
        distributorCode: data.distributorCode ?? '',
        languageId: data.languageId ?? 0,
        login: data.login ?? '',
        password: data.password ?? ''
      }}
      onSubmit={(data) => {
        mutate({
          params: { path: { id: params.id } },
          body: {
            id: params.id,
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

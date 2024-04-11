'use client';

import { useRouter } from 'next/navigation';
import { UpdateIFirmaSetting } from '@/hooks/mutations';
import IFirmaForm from '../components/IFirmaForm';
import { GetiFirmaSetting } from '@/hooks/queries';

export default function IFirmaEditForm({ params }: { params: { id: number } }) {
  const router = useRouter();
  const { data, isPending } = GetiFirmaSetting({ params: { path: { id: params.id } }, reactQuery: { gcTime: 0 } });
  const { mutate } = UpdateIFirmaSetting({
    onSuccess() {
      router.back();
    }
  });

  if (!data) return <h1>Data loading...</h1>;

  return (
    <IFirmaForm
      mode="update"
      isPending={isPending}
      defaultValues={{ email: data?.email?.toString() ?? '', faktura: data?.fakturaApiKey?.toString() ?? '' }}
      onSubmit={(data) => {
        mutate({
          params: { path: { id: params.id } },
          body: {
            id: params.id,
            user: data.email,
            fakturaKey: data.faktura
          }
        });
      }}
    />
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { CreateIFirmaSetting } from '@/hooks/mutations';
import IFirmaForm from '../components/IFirmaForm';

export default function IFirmaCreateForm() {
  const router = useRouter();
  const { mutate, isPending } = CreateIFirmaSetting({
    onSuccess() {
      router.back();
    }
  });

  return (
    <IFirmaForm
      mode="create"
      isPending={isPending}
      onSubmit={(data) => {
        mutate({
          body: {
            user: data.email,
            fakturaKey: data.faktura
          }
        });
      }}
    />
  );
}

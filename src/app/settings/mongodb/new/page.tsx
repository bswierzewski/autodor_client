'use client';

import { useRouter } from 'next/navigation';
import { CreateMongoDBSetting } from '@/hooks/mutations';
import MongoDBForm from '../components/MongoDBForm';

export default function MongoDBCreateForm() {
  const router = useRouter();
  const { mutate, isPending } = CreateMongoDBSetting({
    onSuccess() {
      router.back();
    }
  });

  return (
    <MongoDBForm
      mode="create"
      isPending={isPending}
      onSubmit={(data) => {
        mutate({
          body: {
            collectionName: data.collectionName
          }
        });
      }}
    />
  );
}

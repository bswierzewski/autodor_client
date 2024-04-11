'use client';

import { useRouter } from 'next/navigation';
import { UpdateMongoDBSetting } from '@/hooks/mutations';
import { GetMongoDBSetting } from '@/hooks/queries';
import MongoDBForm from '../components/MongoDBForm';

export default function MongoDBEditForm({ params }: { params: { id: number } }) {
  const router = useRouter();
  const { data, isPending } = GetMongoDBSetting({ params: { path: { id: params.id } }, reactQuery: { gcTime: 0 } });
  const { mutate } = UpdateMongoDBSetting({
    onSuccess() {
      router.back();
    }
  });

  if (!data) return <h1>Data loading...</h1>;

  return (
    <MongoDBForm
      mode="update"
      isPending={isPending}
      defaultValues={{ collectionName: data.collectionName ?? '' }}
      onSubmit={(data) => {
        mutate({
          params: { path: { id: params.id } },
          body: {
            id: params.id,
            collectionName: data.collectionName
          }
        });
      }}
    />
  );
}

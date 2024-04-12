'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  isPending: boolean;
  mode: 'create' | 'update';
};

export default function FormButtons({ mode, isPending }: Props) {
  const router = useRouter();
  return (
    <div className="flex mt-5 gap-5">
      <Button className="flex-1" type="button" variant="outline" onClick={() => router.back()}>
        Cancel
      </Button>
      {isPending ? (
        <Button disabled className="flex-1">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button className="flex-1">{mode === 'create' ? 'Add' : 'Update'}</Button>
      )}
    </div>
  );
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';

type Props = {
  size: number;
  className?: string;
};

export default function Logo({ className, size }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  function doReset() {
    if (pathname !== '/') router.push('/');
  }

  return (
    <div
      onClick={doReset}
      className={`${className} cursor-pointer flex items-center gap-2 text-3xl font-semibold mx-5`}
    >
      {theme == 'dark' ? (
        <Image src="/logo-dark.svg" height={size} width={size} alt={'logo'} />
      ) : (
        <Image src="/logo-light.svg" height={size} width={size} alt={'logo'} />
      )}
    </div>
  );
}

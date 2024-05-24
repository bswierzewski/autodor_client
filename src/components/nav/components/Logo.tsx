'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

type Props = {
  size: number;
  className?: string;
};

export default function Logo({ className, size }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const doReset = () => {
    if (pathname !== '/') router.push('/');
  };

  const logoSrc = useMemo(() => {
    if (!mounted) return '/logo-light.svg'; // Default or placeholder logo
    return theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg';
  }, [theme, mounted]);

  return (
    <div
      onClick={doReset}
      className={`${className} cursor-pointer flex items-center gap-2 text-3xl font-semibold mx-5`}
    >
      <Image src={logoSrc} height={size} width={size} alt={mounted ? `${theme} theme logo` : 'logo'} />
    </div>
  );
}

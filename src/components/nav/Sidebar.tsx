'use client';

import { LogOut } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { env } from 'next-runtime-env';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Urls } from '@/config/site';

import Logo from './components/Logo';
import { ThemePicker } from './components/ThemePicker';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props) {
  const router = useRouter();
  const session = useSession();

  return (
    <div className={`${className} pt-5 p-2 shadow-2xl flex flex-col`}>
      <div className="flex flex-col flex-1 gap-2">
        <Logo size={150} />

        <Separator />
        {session.status === 'authenticated' && (
          <>
            {Urls.map((url) => (
              <Button key={url.id} onClick={() => router.push(url.route)} variant="ghost">
                <div className="flex w-full">
                  {url.icon}
                  <span className="mx-8">{url.label}</span>
                </div>
              </Button>
            ))}
          </>
        )}
      </div>
      <Separator />
      {session.status === 'authenticated' && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-center gap-2 mt-2">
            <Image
              className="rounded-full"
              src={session.data?.user.image ?? ''}
              width={40}
              height={40}
              alt="Picture of the author"
            />
            {session.data?.user.name}
          </div>
          <Separator />
          <div className="flex justify-around">
            <ThemePicker />
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: `https://${env('NEXT_PUBLIC_AUTH0_DOMAIN')}/v2/logout?client_id=${env('NEXT_PUBLIC_AUTH0_CLIENTID')}&returnTo=${env('NEXT_PUBLIC_NEXTAUTH_URL')}`,
                  redirect: true
                })
              }
              size="icon"
              variant="ghost"
            >
              <LogOut />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

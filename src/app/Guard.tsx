'use client';

import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';

export default function Guard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  if (session.status != 'authenticated')
    return (
      <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
        <div className="text-center">
          {session.status === 'unauthenticated' ? (
            <>
              <div className="text-2xl font-bold">You need to be logged in to do that</div>
              <div className="mt-2">Please click below to sign in</div>
              <div className="mt-4">
                <Button variant={'outline'} onClick={() => signIn('auth0')}>
                  Login
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">Session initalize</div>
              <div className="mt-2">Please wait ...</div>
            </>
          )}
        </div>
      </div>
    );

  return children;
}

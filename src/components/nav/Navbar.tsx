'use client';

import { ThemePicker } from './components/ThemePicker';
import { useSession } from 'next-auth/react';
import Avatar from './components/Avatar';
import LoginButton from './components/LoginButton';
import Logo from './components/Logo';
import { Navigation } from './components/Navigation';

export default function Navbar() {
  const session = useSession();

  return (
    <div className="flex justify-center h-20 sticky top-0 shadow-lg p-5 bg-background z-50">
      <div className="flex w-full max-w-screen-2xl items-center justify-between">
        <Logo />
        <Navigation />
        <div className="flex gap-2">
          <ThemePicker />
          {session.status == 'authenticated' ? <Avatar /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
}

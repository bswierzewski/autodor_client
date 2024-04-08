'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { links } from '@/config/site';

export function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <Button
            variant="link"
            className={pathname.startsWith(link.href) ? 'text-foreground hover:no-underline' : 'text-muted-foreground'}
          >
            {link.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}

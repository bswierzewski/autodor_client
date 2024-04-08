import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function IFirmaSettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6">
        <div className="flex">
          <div className="flex-1">
            <h3 className="text-lg font-medium">iFirma</h3>
            <p className="text-sm text-muted-foreground">
              Customize the iFirma account settings. Automatically send invoice to selected profile
            </p>
          </div>
          <Link href="/settings/ifirma/new">
            <Button size="icon" variant="secondary">
              <Plus />
            </Button>
          </Link>
        </div>
        <Separator />
        {children}
      </div>
    </>
  );
}

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function PolcarLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6">
        <div className="flex">
          <div className="flex-1">
            <h3 className="text-lg font-medium">Polcar</h3>
            <p className="text-sm text-muted-foreground">
              Customize the prices of the products app. Automatically download price based on polcar products
            </p>
          </div>
          <Link href="/settings/polcar/new">
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

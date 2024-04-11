import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function MongoDBLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6">
        <div className="flex">
          <div className="flex-1">
            <h3 className="text-lg font-medium">MongoDB</h3>
            <p className="text-sm text-muted-foreground">
              Update constractors databases. Set preferred contractors collections.
            </p>
          </div>
          <Link href="/settings/mongodb/new">
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
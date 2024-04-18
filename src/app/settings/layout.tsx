import { SidebarNav } from './components/sidebar-nav';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="-mx-4 lg:w-1/5">
        <SidebarNav />
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}

import { ScrollText, Settings, UserSearch } from 'lucide-react';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'MTParts',
  description: 'Invoice clients',
  company: 'NinjaByte'
};

// Define button data
export const Urls = [
  {
    id: 1,
    label: 'Dashboard',
    icon: <ScrollText />,
    iconSmall: <ScrollText className="h-4 w-4" />,
    route: '/dashboard'
  },
  {
    id: 2,
    label: 'Contractors',
    icon: <UserSearch />,
    iconSmall: <UserSearch className="h-4 w-4" />,
    route: '/contractors'
  },
  { id: 3, label: 'Settings', icon: <Settings />, iconSmall: <Settings className="h-4 w-4" />, route: '/settings' }
];

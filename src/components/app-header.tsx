import React from 'react';
import ThemeSwitch from '@/components/theme-switch';
import LanguageSwitch from '@/components/lang-switch';
import { UserNav } from '@/containers/DashBoard/components/user-nav';
import NotificationDropdown from './notification';

const AppHeader: React.FC = () => (
  <header className="border-b flex place-content-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div className="flex items-center gap-2 px-4"></div>
    <div className="flex h-16 items-center px-4">
      <div className="ml-auto flex items-center space-x-4">
        <NotificationDropdown />
        <ThemeSwitch />
        <LanguageSwitch />
      </div>
      <UserNav />
    </div>
  </header>
);

export default AppHeader;

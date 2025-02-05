import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Search } from '@/containers/DashBoard/components/search';
import { UserNav } from '@/containers/DashBoard/components/user-nav';
import ThemeSwitch from '@/components/theme-switch';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Switch from 'react-switch';

export default function AppShell() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="border-b flex place-content-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ThemeSwitch />
              <div className="flex items-center space-x-2 pr-4">
                <Switch
                  onChange={toggleLanguage}
                  checked={i18n.language === 'vi'}
                  offColor="#888"
                  onColor="#0d6efd"
                  uncheckedIcon={
                    <div className="flex items-center justify-center h-full w-full">
                      <img
                        src="src/assets/images/us.png"
                        alt="US Flag"
                        className="h-4 w-4 object-cover"
                      />
                    </div>
                  }
                  checkedIcon={
                    <div className="flex items-center justify-center h-full w-full">
                      <img
                        src="src/assets/images/vietnam.png"
                        alt="Vietnam Flag"
                        className="h-4 w-4 object-cover"
                      />
                    </div>
                  }
                  height={26}
                  width={50}
                  handleDiameter={20}
                  borderRadius={12}
                  className="react-switch"
                />
              </div>
            </div>
            <UserNav />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

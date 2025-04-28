'use client';

import * as React from 'react';
import {
  BookOpen,
  Settings2,
  SquareTerminal,
  MessageCircle,
  LucideIcon,
} from 'lucide-react';

import { selectUserInfo } from '@/containers/Auth/selector';
import { NavUser } from '@/components/nav-user';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useTranslation } from 'react-i18next';
import {
  CHAT_ROUTE,
  DASHBOARD_ROUTE,
  ITEM_REQUEST_ROUTE,
  PAYMENT_HISTORY_MANAGEMENT_ROUTE,
  STAFFS_MANAGEMENT_ROUTE,
  SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from '@/common/constants/router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Define types
interface NavSubItem {
  title: string;
  url: string;
}

interface NavItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  items?: NavSubItem[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const userInfo = useSelector(selectUserInfo);
  const role = userInfo?.roleName;

  // Define navigation items
  const chatItem: NavItem = {
    title: 'Chat',
    url: CHAT_ROUTE,
    icon: MessageCircle,
  };

  const humanItem: NavItem = {
    title: t('sidebar.human'),
    icon: SquareTerminal,
    items: [
      {
        title: t('sidebar.staffs'),
        url: STAFFS_MANAGEMENT_ROUTE,
      },
      {
        title: t('sidebar.residents'),
        url: USERS_MANAGEMENT_ROUTE,
      },
    ],
  };

  const navSingle: NavItem[] =
    role === 'ROLE_ADMIN'
      ? [
          humanItem,
          {
            title: 'Subcription plans',
            url: SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE,
            icon: Settings2,
          },
          {
            title: 'Payment history',
            url: PAYMENT_HISTORY_MANAGEMENT_ROUTE,
            icon: Settings2,
          },
          chatItem,
        ]
      : [
          humanItem,
          {
            title: 'Item requests',
            url: ITEM_REQUEST_ROUTE,
            icon: BookOpen,
          },
          {
            title: 'Payment history',
            url: PAYMENT_HISTORY_MANAGEMENT_ROUTE,
            icon: Settings2,
          },
          chatItem,
        ];

  const data = {
    user: {
      name: userInfo?.fullName || 'shadcn',
      email: userInfo?.email || 'm@example.com',
      avatar: userInfo?.image || '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'REAS',
        logo: 'https://res.cloudinary.com/dpysbryyk/image/upload/v1744177339/REAS/Logo/Reas-logo.png',
        plan: 'Enterprise',
        url: DASHBOARD_ROUTE,
      },
    ],
    navSingle,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {data.teams.map((team) => (
          <Link
            key={team.name}
            to={team.url}
            className="flex items-center gap-2 p-2 rounded transition-colors duration-200 hover:bg-gray-700 hover:text-white"
          >
            <img src={team.logo} alt={team.name} className="w-5 h-5" />
            <div>
              <p className="font-bold">{team.name}</p>
              <p className="text-sm text-gray-500">{team.plan}</p>
            </div>
          </Link>
        ))}
      </SidebarHeader>

      <SidebarContent>
        {data.navSingle.map((item) =>
          item.items ? (
            <div key={item.title}>
              <div className="flex items-center gap-2 p-2 font-semibold">
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </div>
              <div className="ml-6">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.title}
                    to={subItem.url}
                    className="block p-2 text-sm rounded transition-colors duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.title}
              to={item.url!}
              className="flex items-center gap-2 p-2 rounded transition-colors duration-200 hover:bg-gray-700 hover:text-white"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          ),
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

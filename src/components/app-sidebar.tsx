'use client';

import * as React from 'react';
import {
  MessageCircle,
  AlertCircle,
  Upload,
  CreditCard,
  User,
  Package,
} from 'lucide-react';

import { selectUserInfo } from '@/containers/Auth/selector';
import { NavMain } from '@/components/nav-main';
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
  CRITICAL_REPORT_MANAGEMENT_ROUTE,
  DASHBOARD_ROUTE,
  ITEM_REQUEST_ROUTE,
  PAYMENT_HISTORY_MANAGEMENT_ROUTE,
  STAFFS_MANAGEMENT_ROUTE,
  SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from '@/common/constants/router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const userInfo = useSelector(selectUserInfo);
  const role = userInfo?.roleName;

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
    navMain: [
      {
        title: t('sidebar.human'),
        url: '#',
        icon: User,
        isActive: true,
        items: [
          ...(role !== 'ROLE_STAFF'
            ? [
                {
                  title: t('sidebar.staffs'),
                  url: STAFFS_MANAGEMENT_ROUTE,
                },
              ]
            : []),
          {
            title: t('sidebar.residents'),
            url: USERS_MANAGEMENT_ROUTE,
          },
        ],
      },
      ...(role === 'ROLE_ADMIN'
        ? [
            {
              title: 'Subscription plans',
              url: SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE,
              icon: Package,
            },
          ]
        : [
            {
              title: t('sidebar.items'),
              url: ITEM_REQUEST_ROUTE,
              icon: Upload,
            },
          ]),
      {
        title: 'Payment history',
        url: PAYMENT_HISTORY_MANAGEMENT_ROUTE,
        icon: CreditCard,
      },
      {
        title: t('sidebar.criticalReport'),
        url: CRITICAL_REPORT_MANAGEMENT_ROUTE,
        icon: AlertCircle,
      },
      {
        title: 'Chat',
        url: CHAT_ROUTE,
        icon: MessageCircle,
      },
    ],
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
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

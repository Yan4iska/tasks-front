import type { PropsWithChildren } from 'react';

import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

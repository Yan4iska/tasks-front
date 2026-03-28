import { Heading } from '@/components/ui/heading/Heading';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { Metadata } from 'next';
import React from 'react';
import Statistics from './Statistics/Statistics';

export const metadata: Metadata = {
  title: 'Dashboard',
  ...NO_INDEX_PAGE,
};

const DashboardPage = () => {
  return (
    <div>
      <Heading title="Statistics" />
      <Statistics />
    </div>
  );
};

export default DashboardPage;

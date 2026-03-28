import type { Metadata } from 'next';

import { Heading } from '@/components/ui/heading/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Settings } from './Settings/Settings';

export const metadata: Metadata = {
  title: 'Settings',
  ...NO_INDEX_PAGE,
};

export default function SettingsPage() {
  return (
    <div>
      <Heading title={'Settings'} /> <Settings />
    </div>
  );
}

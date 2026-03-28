import React, { FC } from 'react';
import GlobalLoader from './GlobalLoader/GlobalLoader';
import { Profile } from './Profile/Profile';

export const Header: FC = () => {
  return (
    <header>
      <GlobalLoader />
      <Profile />
    </header>
  );
};

'use client';
import Loader from '@/components/ui/Loader/Loader';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import React from 'react';
import styles from './GlobalLoader.module.scss';
const GlobalLoader = () => {
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  return isMutating || isFetching ? (
    <div className={styles.root}>
      <Loader />
    </div>
  ) : null;
};

export default GlobalLoader;

'use client';

import dynamic from 'next/dynamic';
import Loader from '@/components/ui/Loader/Loader';

import { useLocalStorage } from '@/hooks/useLocalStorage';

import { SwitcherView } from '../SwitcherView/SwitcherView';
const KanbanView = dynamic(
  () => import('../kanban-view/KanbanView').then((mod) => mod.KanbanView),
  { loading: () => <Loader /> },
);
const ListView = dynamic(() => import('../list-view/ListView/ListView').then((mod) => mod.ListView), {
  loading: () => <Loader />,
});

export type TypeView = 'list' | 'kanban';

export function TasksView() {
  const [type, setType, isLoading] = useLocalStorage<TypeView>({
    key: 'view-type',
    defaultValue: 'list',
  });

  if (isLoading) return <Loader />;

  return (
    <div>
      <SwitcherView setType={setType} type={type} />
      {type === 'list' ? <ListView /> : <KanbanView />}
    </div>
  );
}

import { redirect } from 'next/navigation';

export default function BoardsPage() {
  // Routing: canonical "workspace" entry for the app.
  // Today it maps to Tasks (kanban/list) inside the dashboard area.
  redirect('/i/tasks');
}


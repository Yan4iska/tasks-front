import { redirect } from 'next/navigation';

export default function Home() {
  // UX: landing page should go straight to the workspace entry.
  redirect('/boards');
}

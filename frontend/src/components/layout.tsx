import { Outlet } from 'react-router';
import { Navigation } from './navigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

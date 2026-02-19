import { Link, Outlet, useLocation } from 'react-router';
import { User, BookMarked, Users, Bell } from 'lucide-react';

export function ProfileLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/profile', label: 'Profile Settings', icon: User },
    { path: '/profile/bookings', label: 'My Bookings', icon: BookMarked },
    { path: '/profile/clubs', label: 'My Clubs', icon: Users },
    { path: '/profile/notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>
      
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <nav className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 last:border-0 transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

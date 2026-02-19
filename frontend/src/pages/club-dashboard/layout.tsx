import { Link, Outlet, useLocation, useParams } from 'react-router';
import { LayoutDashboard, Calendar, Users, DollarSign, ChevronLeft, User } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
export function ClubDashboardLayout() {
  const { id } = useParams();
  const {user} = useAuth();
  const location = useLocation();
  const club = user?.adminClubs[0];
  console.log(club);
  if (!club) {
    return (
      <div className="max-w-screen-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Club Not Found</h1>
        <Link to="/clubs" className="text-blue-600 dark:text-blue-400 hover:underline">
          Back to Clubs
        </Link>
      </div>
    );
  }

  const menuItems = [
    { path: `/clubs/${id}/dashboard`, label: 'Overview', icon: LayoutDashboard },
    { path: `/clubs/${id}/dashboard/events`, label: 'Events', icon: Calendar },
    { path: `/clubs/${id}/dashboard/members`, label: 'Members', icon: Users },
    { path: `/clubs/${id}/dashboard/finances`, label: 'Finances', icon: DollarSign }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      <Link 
        to={`/clubs/${id}`}
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
      >
        <ChevronLeft className="size-4" />
        Back to Club Page
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <img src={club.logo} alt={club.club_name} className="size-16 rounded-full" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{club.club_name} Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Admin Panel</p>
        </div>
      </div>
      
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <nav className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden sticky top-24">
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
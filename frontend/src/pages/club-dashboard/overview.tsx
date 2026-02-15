import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { useParams } from 'react-router';
import { mockClubs, mockEvents } from '../../lib/mock-data';

export function DashboardOverviewPage() {
  const { id } = useParams();
  const club = mockClubs.find(c => c.id === id);
  const clubEvents = mockEvents.filter(e => e.club.id === id);

  if (!club) return null;

  const totalRevenue = clubEvents.reduce((sum, event) => {
    const soldTickets = event.totalSeats - event.availableSeats;
    return sum + (soldTickets * event.price);
  }, 0);

  const stats = [
    {
      label: 'Total Members',
      value: club.members,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      change: '+12 this month'
    },
    {
      label: 'Events Hosted',
      value: clubEvents.length,
      icon: Calendar,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
      change: '3 upcoming'
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue}`,
      icon: DollarSign,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      change: '+24% from last month'
    },
    {
      label: 'Avg. Attendance',
      value: '85%',
      icon: TrendingUp,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      change: '+5% improvement'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`size-6 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</div>
              <div className="text-xs text-green-600 dark:text-green-400">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New member joined', user: 'Alex Johnson', time: '2 hours ago' },
            { action: 'Event booking confirmed', user: 'Sarah Smith', time: '5 hours ago' },
            { action: 'Payment verified', user: 'Mike Chen', time: '1 day ago' },
            { action: 'New event created', user: 'Admin', time: '2 days ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0 last:pb-0">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-gray-900 dark:text-white font-medium">{activity.action}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{activity.user} • {activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { Users, Calendar, ChevronLeft } from 'lucide-react';
import { mockClubs, mockEvents } from '../lib/mock-data';
import { useAuth } from '../lib/auth-context';
import api from '../lib/api';
import { Club } from '../lib/auth-context';

export function ClubDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [club, setClub] = useState<Club>();
  useEffect(() => {
    async function get_club_detail() {
      const res = await api.get(`/clubs/${id}`);
      setClub(res.data);
    }
    get_club_detail();
  }, []);

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

  const clubEvents = mockEvents.filter(e => e.club.id === id);
  const isMember = user?.clubs.some(c => c.club_id === id);
  const isAdmin = user?.adminClubs.some(c => c.club_id === id);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      <Link 
        to="/clubs" 
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
      >
        <ChevronLeft className="size-4" />
        Back to Clubs
      </Link>

      {/* Cover & Header */}
      <div className="relative h-64 bg-blue-600 dark:bg-blue-800 rounded-xl overflow-hidden mb-8">
        <img 
          src={club.coverImage} 
          alt={club.club_name}
          className="w-full h-full object-cover opacity-50"
        />
        <img
          src={club.logo}
          alt={club.club_name}
          className="absolute -bottom-12 left-8 size-32 rounded-full border-4 border-white dark:border-gray-950 shadow-lg"
        />
      </div>

      <div className="flex items-start justify-between mb-8 pl-48">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{club.club_name}</h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="size-4" />
              <span>{club.members} members</span>
            </div>
            <span>•</span>
            <span>{club.category}</span>
          </div>
        </div>

        {isAdmin ? (
          <Link
            to={`/clubs/${id}/dashboard`}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Manage Club
          </Link>
        ) : isMember ? (
          <button className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg cursor-default">
            Member
          </button>
        ) : (
          <button
            disabled={club.invite_only}
            className={`flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium
             ${
               club.invite_only
                 ? "bg-gray-400 cursor-not-allowed text-white hover:bg-gray"
                 : "bg-blue-600 hover:bg-blue-700 text-white"
             }`}
          >
            {!club.invite_only ? <>Join Club</> : <>Invite Only</>}
          </button>
        )}
      </div>

      {/* About */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{club.description}</p>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
          <Link to="/events" className="text-blue-600 dark:text-blue-400 hover:underline">
            View all
          </Link>
        </div>

        {clubEvents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <Calendar className="size-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No upcoming events</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {event.date} • {event.time}
                  </div>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
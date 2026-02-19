import { Link } from 'react-router';
import { Calendar, MapPin, Users, ArrowRight, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect} from 'react';
import api from '../lib/api';
import { Event } from '../lib/auth-context';
import { Club } from '../lib/auth-context';
export function HomePage() {
    const [events, setEvents] = useState<Event[]>([]);
     useEffect(() => {
    async function get_events(){
    const res = await api.get(`/events`);
    setEvents(res.data);
    }
    get_events();
  }, []);

  const [clubs, setClubs] = useState<Club[]>([]);
    useEffect(() => {
      async function get_clubs() {
        const res = await api.get(`/clubs`);
        setClubs(res.data);
      }
      get_clubs();
    }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-black">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1080&fit=crop&q=80" 
            alt="Campus Events"
            className="w-full h-full object-cover opacity-90"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-screen-2xl mx-auto px-6 text-center text-white">
            <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Discover Amazing Events</h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto drop-shadow-md">
              Connect with clubs, attend exciting events, and make the most of your college experience
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/events"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-2 text-lg shadow-lg"
              >
                Browse Events
                <ArrowRight className="size-5" />
              </Link>
              <Link
                to="/clubs"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors border border-white/20 text-lg shadow-lg backdrop-blur-sm"
              >
                Explore Clubs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Happening This Week */}
      <section className="max-w-screen-2xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Happening This Week</h2>
          <Link to="/events" className="text-blue-600 dark:text-blue-400 hover:underline">
            View all events
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Popular Clubs */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Clubs</h2>
            <Link to="/clubs" className="text-blue-600 dark:text-blue-400 hover:underline">
              View all clubs
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {clubs.map((club) => (
              <ClubCard key={club.club_id} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="max-w-screen-2xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Trending Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/events?category=${category.name.toLowerCase()}`}
              className="group p-8 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  {category.icon}
                </div>
                <TrendingUp className="size-5 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{category.count} upcoming events</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function EventCard({ event }: { event: any }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4" />
            <span>{event.venue}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <img src={event.club.logo} alt={event.club.name} className="size-5 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{event.club.name}</span>
          </div>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </span>
        </div>
      </div>
    </Link>
  );
}

function ClubCard({ club }: { club: any }) {
  return (
    <Link
      to={`/clubs/${club.club_id}`}
      className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-24 bg-blue-600 dark:bg-blue-800">
        <img 
          src={club.cover_image} 
          alt={club.club_name}
          className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
        />
        <img
          src={club.logo}
          alt={club.club_name}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 size-16 rounded-full border-4 border-white dark:border-gray-900"
        />
      </div>
      <div className="pt-10 pb-4 px-4 text-center">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {club.club_name}
        </h3>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <Users className="size-4" />
          <span>{club.members} members</span>
        </div>
      </div>
    </Link>
  );
}

// Mock Data

const categories = [
  { name: 'Workshops', count: 12, icon: <Calendar className="size-6 text-blue-600" />, color: 'bg-blue-100 dark:bg-blue-900' },
  { name: 'Sports', count: 8, icon: <Users className="size-6 text-green-600" />, color: 'bg-green-100 dark:bg-green-900' },
  { name: 'Cultural', count: 15, icon: <TrendingUp className="size-6 text-purple-600" />, color: 'bg-purple-100 dark:bg-purple-900' }
];
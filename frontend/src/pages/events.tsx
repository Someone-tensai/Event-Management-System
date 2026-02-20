import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, Filter, X } from "lucide-react";
import api from "../lib/api";
import { Event } from "../lib/auth-context";
import { Loading } from "../loading";
import { toast } from "../lib/toast";
export function EventsPage() {
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"all" | "free">("all");
  const [sortBy, setSortBy] = useState<"date" | "price">("price");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // Filter events
  useEffect(() => {
    async function get_events() {
      try {
        const res = await api.get(
          `/events?sort_by=${sortBy}&&type=${selectedType}`,
        );
        setEvents(res.data);
      } catch (err) {
        toast.error("ERROR: Could not Fetch Events");
      } finally {
        setLoading(false);
      }
    }
    get_events();
  }, [sortBy, selectedType]);

  const clearFilters = () => {
    setSelectedType([]);
    setPriceFilter("all");
  };

  const hasActiveFilters = selectedType.length > 0 || priceFilter !== "all";

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        {/* Left Sidebar - Filters */}
        <aside className="w-64 shrink-0">
          <div className="sticky top-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Filter className="size-5" />
                Filters
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Event Type */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Event Type
              </h3>
              <div className="space-y-2">
                {["physical", "online", "hybrid"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedType.includes(type)}
                      onChange={() => setSelectedType(type as any)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content - Events Grid */}
        {
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Upcoming Events
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {events.length} event{events.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>

            {loading ? (
              <Loading />
            ) : events.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <Calendar className="size-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No events found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters to see more events
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </main>
        }
      </div>
    </div>
  );
}

function EventCard({ event }: { event: any }) {
  console.log(event);
  return (
    <Link
      to={`/events/${event.id}`}
      className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 text-white text-xs rounded capitalize">
          {event.type}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0" />
            <span>
              {event.date} • {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span>{event.venue}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <img
              src={event.club.logo}
              alt={event.club.club_name}
              className="size-5 rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {event.club.name}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {event.price === 0 ? "Free" : `$${event.price}`}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {event.availableSeats}/{event.totalSeats} seats
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

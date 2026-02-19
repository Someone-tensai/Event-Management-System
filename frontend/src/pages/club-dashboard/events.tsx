import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Calendar, Check, X, Eye, Edit } from "lucide-react";
import { Event } from "../../lib/auth-context";
import api from "../../lib/api";

export function DashboardEventsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<
    "published" | "pending" | "drafts" | "past"
  >("published");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  // Filter events
  useEffect(() => {
    async function get_events() {
      const res = await api.get(`/clubs/events/${id}`);
      setEvents(res.data);
    }
    get_events();
  }, []);

  // Mock different event states


  return (
    <>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Event Management
            </h2>
            <Link
              to="/events/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Event
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "published" && (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="size-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>
                        {event.totalSeats - event.availableSeats}/
                        {event.totalSeats} booked
                      </span>
                      <span>•</span>
                      <span className="text-green-600 dark:text-green-400">
                        Published
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/events/${event.id}`}
                      className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Eye className="size-4 text-gray-600 dark:text-gray-400" />
                    </Link>
                    <button className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Edit className="size-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

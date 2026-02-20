import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Event } from "../../lib/auth-context";

export function DashboardOverviewPage() {
  const { id } = useParams();
  console.log(id);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEvents() {
      try {
        console.log(id);
        const res = await api.get(`/clubs/events/${id}`);
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getEvents();
  }, []);

  async function handleDelete(eventId: any) {
    try {
      await api.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error(err);
    }
  }

  const totalRevenue = events.reduce((sum, event) => {
    const sold = event.totalSeats - event.availableSeats;
    return sum + sold * event.price;
  }, 0);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      {/* Total Revenue */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-10">
        <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
        <p className="text-3xl font-bold text-blue-600">${totalRevenue}</p>
      </div>

      {/* Events List */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Your Events</h2>

        {events.length === 0 ? (
          <p className="text-gray-500">No events created yet.</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const sold = event.totalSeats - event.availableSeats;
              const revenue = sold * event.price;

              return (
                <div
                  key={event.id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {sold} tickets sold • Revenue: ${revenue}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/events/edit/${event.id}`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm"
                    >
                      Edit
                    </Link>

                    <Link
                      to={`/events/delete/${id}/${event.id}`}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

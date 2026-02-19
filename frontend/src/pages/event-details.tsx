import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Info,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../lib/auth-context";
import api from "../lib/api";
import { Event } from "../lib/auth-context";

export function EventDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [event, setEvent] = useState<Event>();
  const [booked_tickets, setBookedTickets] = useState<number>(0);

  const [hasBooked, setHasBooked] = useState(false);

  useEffect(() => {
    async function check_if_booked() {
      const booking = await api.get(`/bookings/user?event_id=${id}`);
      if (booking.data.id) {
        setHasBooked(true);
        setBookedTickets(booking.data.tickets);
      }
    }
    check_if_booked();
  }, []);

  useEffect(() => {
    async function get_event() {
      try {
        const event = await api.get(`/events/${id}`);
        setEvent(event.data);
      } catch (err) {
        throw err;
      }
    }
    get_event();
  }, []);

  if (!event) {
    return (
      <div className="max-w-screen-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Event Not Found
        </h1>
        <Link
          to="/events"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const availabilityPercentage =
    (event.availableSeats / event.totalSeats) * 100;
  const isAlmostFull = availabilityPercentage < 20;
  const isFull = event.availableSeats === 0;

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
        >
          <ChevronLeft className="size-4" />
          Back to Events
        </Link>

        <div className="flex gap-8">
          {/* Left Column - Content */}
          <div className="flex-1">
            {/* Banner Image */}
            <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden mb-6">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {event.title}
              </h1>
              <Link
                to={`/clubs/${event.club.club_id}`}
                className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <img
                  src={event.club.logo}
                  alt={event.club.club_name}
                  className="size-10 rounded-full"
                />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Organized by
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {event.club.club_name}
                  </div>
                </div>
              </Link>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About This Event
              </h2>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {event.description}
              </div>
            </div>

            {/* Agenda */}
            {event.agenda && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Event Agenda
                </h2>
                <div className="space-y-3">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                      <div className="text-gray-700 dark:text-gray-300">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Venue */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Location
              </h2>
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-gray-500 mt-1 shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {event.venue}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Campus Location
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Policy */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex gap-3">
                <Info className="size-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Refund Policy
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {event.refundPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Booking Widget */}
          <div className="w-96 shrink-0">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-lg">
                <div className="space-y-4 mb-6">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3">
                    <Calendar className="size-5 text-gray-500 mt-1 shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Date & Time
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {event.date}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {event.time}
                      </div>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="flex items-start gap-3">
                    <Clock className="size-5 text-gray-500 mt-1 shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Event Type
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white capitalize">
                        {event.type}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-start gap-3">
                    <DollarSign className="size-5 text-gray-500 mt-1 shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Ticket Price
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {event.price === 0 ? "Free" : `$${event.price}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Availability
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium ${isFull ? "text-red-600 dark:text-red-400" : isAlmostFull ? "text-orange-600 dark:text-orange-400" : "text-green-600 dark:text-green-400"}`}
                    >
                      {event.availableSeats}/{event.totalSeats} seats left
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${isFull ? "bg-red-500" : isAlmostFull ? "bg-orange-500" : "bg-green-500"}`}
                      style={{
                        width: `${Math.max(5, availabilityPercentage)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Alert if almost full */}
                {isAlmostFull && !isFull && (
                  <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg mb-4">
                    <AlertCircle className="size-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      Hurry! Only a few seats remaining.
                    </p>
                  </div>
                )}

                {/* Action Button */}
                {isFull ? (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                  >
                    Event Full
                  </button>
                ) : user ? (
                  !hasBooked ? (
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Book Ticket
                    </button>
                  ) : (
                    <>
                      <button
                        disabled
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium cursor-not-allowed"
                      >
                        {booked_tickets} Booked
                      </button>
                    </>
                  )
                ) : (
                  <Link
                    to="/login"
                    className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-medium  transition-colors"
                  >
                    Login to Book
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && !hasBooked && (
        <BookingModal
          event={event}
          onClose={() => setShowBookingModal(false)}
          onBook={(quantity) => {
            setHasBooked(true);
            setBookedTickets(quantity);
          }}
        />
      )}
    </>
  );
}

function BookingModal({
  event,
  onClose,
  onBook,
}: {
  event: any;
  onClose: () => void;
  onBook: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState<string | number>(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleBook = async () => {
    // In real app, this would call an API

    try {
      const res = await api.post(`/bookings/add`, {
        event_id: event.id,
        tickets_booked: quantity,
      });
      if (res.status != 200) {
        setShowSuccess(false);
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          onBook(parseInt(quantity as any));
          onClose();
        }, 2000);
      }
    } catch (err) {
      setShowSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
              <svg
                className="size-8 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check your bookings in your profile
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Book Ticket
            </h2>

            <div className="mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>
                    {event.date} • {event.time}
                  </div>
                  <div>{event.venue}</div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Number of Tickets (Max 5)
                </label>
                <input
                  type="number"
                  min="1"
                  max={Math.min(5, event.availableSeats)}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      parseInt(e.target.value) <= 5
                        ? parseInt(e.target.value)
                        : "",
                    )
                  }
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="font-medium text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {event.price === 0 ? "Free" : `$${event.price * (quantity as any)}`}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              

              <button
                onClick={() => {
                  if (!showWarning) {
                    setShowWarning(true);
                  } else {
                    handleBook();
                  }
                }}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors text-white ${
                  showWarning
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {showWarning ? "Yes, Book Now" : "Confirm Booking"}
              </button>
            </div>

            {showWarning && (
                <>
                <br />
                <div className="mb-4 rounded-lg bg-red-600 border border-red-200 px-4 py-3">
                  <p className="text-sm text font-bold ">
                    You can only book tickets for an event once.
                    <span className="font-bold " >
                      {" "}
                      Confirm before booking.
                    </span>
                  </p>
                </div>
              
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

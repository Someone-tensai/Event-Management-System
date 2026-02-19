import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, Upload, Eye, X } from 'lucide-react';
import { mockBookings } from '../../lib/mock-data';
import { Booking } from '../../lib/auth-context';
import api from '../../lib/api';

export function BookingsPage() {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(()=>{
    async function get_bookings() {
      try{
        const bookings_data = await api.get("/bookings/all");
        setBookings(bookings_data.data);
      }
      catch(err)
      {
        throw err;
      }
    }
    get_bookings();
  }, []);
  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
      confirmed: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800',
      cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800',
      waitlisted: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your event tickets and bookings</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date & Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tickets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link 
                      to={`/events/${booking.event_id}`}
                      className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {booking.event_name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="size-3" />
                        {booking.event_date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {booking.venue}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {booking.tickets}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowTicketModal(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="size-3.5" />
                          View Ticket
                        </button>
                      )}
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowUploadModal(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          <Upload className="size-3.5" />
                          Upload Payment
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="size-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookings yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Start exploring events and book your first ticket!</p>
            <Link
              to="/events"
              className="inline-flex px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Events
            </Link>
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      {showTicketModal && selectedBooking && (
        <TicketModal booking={selectedBooking} onClose={() => setShowTicketModal(false)} />
      )}

      {/* Upload Payment Modal */}
      {showUploadModal && selectedBooking && (
        <UploadPaymentModal booking={selectedBooking} onClose={() => setShowUploadModal(false)} />
      )}
    </>
  );
}

function TicketModal({ booking, onClose }: { booking: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="size-5 text-gray-500" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Ticket</h2>
          
          {/* QR Code */}
          <div className="bg-white p-6 rounded-lg mb-6 inline-block">
            <img src={booking.qrCode} alt="Ticket QR Code" className="size-64" />
          </div>

          {/* Event Details */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">{booking.eventName}</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                {booking.eventDate}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                {booking.venue}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tickets</span>
                <span className="font-medium text-gray-900 dark:text-white">{booking.tickets}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600 dark:text-gray-400">Booking ID</span>
                <span className="font-mono text-xs font-medium text-gray-900 dark:text-white">{booking.id.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
            Present this QR code at the event entrance
          </p>

          <button
            onClick={() => window.print()}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

function UploadPaymentModal({ booking, onClose }: { booking: any; onClose: () => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploaded(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Payment Proof</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{booking.eventName}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {booking.eventDate} • {booking.venue}
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : uploaded
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-300 dark:border-gray-700'
            }`}
          >
            {uploaded ? (
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-3">
                  <svg className="size-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium">Payment proof uploaded!</p>
              </div>
            ) : (
              <div>
                <Upload className="size-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Drop your file here, or <label htmlFor="file-upload" className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">browse</label>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">PNG, JPG up to 10MB</p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={() => setUploaded(true)}
                />
              </div>
            )}
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
            onClick={onClose}
            disabled={!uploaded}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              uploaded
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

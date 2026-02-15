import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, Check, X, Eye, Edit } from 'lucide-react';
import { mockEvents } from '../../lib/mock-data';

export function DashboardEventsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'published' | 'pending' | 'drafts' | 'past'>('published');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const clubEvents = mockEvents.filter(e => e.club.id === id);

  // Mock different event states
  const events = {
    published: clubEvents,
    pending: [
      { id: 'p1', title: 'Workshop: Web Development Basics', status: 'pending_approval', date: 'Feb 15, 2026' }
    ],
    drafts: [
      { id: 'd1', title: 'Hackathon 2026 (Draft)', status: 'draft', date: 'Mar 1, 2026' }
    ],
    past: [
      { id: 'past1', title: 'Tech Talk: AI in 2025', status: 'completed', date: 'Jan 20, 2026' }
    ]
  };

  const tabs = [
    { id: 'published', label: 'Published', count: events.published.length },
    { id: 'pending', label: 'Pending Approval', count: events.pending.length },
    { id: 'drafts', label: 'Drafts', count: events.drafts.length },
    { id: 'past', label: 'Past Events', count: events.past.length }
  ];

  return (
    <>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Event Management</h2>
            <Link
              to="/events/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Event
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'published' && (
            <div className="space-y-4">
              {clubEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <img src={event.image} alt={event.title} className="size-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.totalSeats - event.availableSeats}/{event.totalSeats} booked</span>
                      <span>•</span>
                      <span className="text-green-600 dark:text-green-400">Published</span>
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

          {activeTab === 'pending' && (
            <div className="space-y-4">
              {events.pending.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Scheduled for {event.date} • Awaiting approval
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowReviewModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'drafts' && (
            <div className="space-y-4">
              {events.drafts.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Draft • Not published
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Edit Draft
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="space-y-4">
              {events.past.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg opacity-60">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {event.date} • Event completed
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    View Report
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedEvent && (
        <ReviewEventModal
          event={selectedEvent}
          onClose={() => setShowReviewModal(false)}
          onApprove={() => {
            setShowReviewModal(false);
            // In real app, would update event status
          }}
          onReject={() => {
            setShowReviewModal(false);
            // In real app, would update event status
          }}
        />
      )}
    </>
  );
}

function ReviewEventModal({ event, onClose, onApprove, onReject }: any) {
  const [rejectionReason, setRejectionReason] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review Event</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Scheduled for {event.date}
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Event details would be displayed here including description, venue, pricing, etc.
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Rejection Reason (if rejecting)
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              placeholder="Provide a reason for rejection..."
            />
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
            onClick={onReject}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
          >
            <X className="size-4" />
            Reject
          </button>
          <button
            onClick={onApprove}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Check className="size-4" />
            Approve & Publish
          </button>
        </div>
      </div>
    </div>
  );
}
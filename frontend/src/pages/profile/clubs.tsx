import { Link } from "react-router";
import { Users, Shield, ExternalLink } from "lucide-react";
import { useAuth } from "../../lib/auth-context";

export function MyClubsPage() {
  const { user } = useAuth();

  if (!user) return null;

  const myClubs = user.clubs;
  const adminClubs = user.adminClubs;

  return (
    <div className="space-y-6">
      {/* Admin Clubs */}
      {adminClubs.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="size-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Clubs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminClubs.map((club) => (
              <div
                key={club.club_id}
                className="group border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-24 bg-blue-600 dark:bg-blue-800">
                  <img
                    src={club.cover_image}
                    alt={club.club_name}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <img
                    src={club.logo}
                    alt={club.club_name}
                    className="absolute -bottom-6 left-4 size-14 rounded-full border-4 border-white dark:border-gray-900"
                  />
                </div>
                <div className="pt-10 pb-4 px-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {club.club_name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <Users className="size-4" />
                    <span>{club.members} members</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/clubs/${club.club_id}`}
                      className="flex-1 px-3 py-1.5 text-center text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      View Club
                    </Link>
                    <Link
                      to={`/clubs/${club.club_id}/dashboard`}
                      className="flex-1 px-3 py-1.5 text-center text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Member Clubs */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="size-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Clubs
          </h2>
        </div>

        {myClubs.length === 0 ? (
          <div className="text-center py-12">
            <Users className="size-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No clubs joined yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Explore clubs and join your interests!
            </p>
            <Link
              to="/clubs"
              className="inline-flex px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Clubs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myClubs.map((club) => (
              <div
                key={club.club_id}
                className="group border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-24 bg-blue-600 dark:bg-blue-800">
                  <img
                    src={club.cover_image}
                    alt={club.club_name}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <img
                    src={club.logo}
                    alt={club.club_name}
                    className="absolute -bottom-6 left-4 size-14 rounded-full border-4 border-white dark:border-gray-900"
                  />
                  {user.adminClubs.includes(club.club_id as any) && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">
                      ADMIN
                    </div>
                  )}
                </div>
                <div className="pt-10 pb-4 px-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {club.club_name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <Users className="size-4" />
                    <span>{club.members} members</span>
                  </div>
                  <Link
                    to={`/clubs/${club.club_id}`}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    View Club
                    <ExternalLink className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Invitations */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Pending Invitations
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-500">
          No pending invitations
        </div>
      </div>
    </div>
  );
}

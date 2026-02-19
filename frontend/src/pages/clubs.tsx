import { Link } from "react-router";
import { Users, ExternalLink, Key } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../lib/api";
import { Club } from "../lib/auth-context";
import { useAuth } from "../lib/auth-context";

export function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  useEffect(() => {
    async function get_clubs() {
      const res = await api.get(`/clubs`);
      setClubs(res.data);
    }
    get_clubs();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Clubs
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover and join amazing clubs to enhance your college experience
        </p>
      </div>

      <div className="grid grid-cols-1 mb-10 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clubs.map((club) => (
          <ClubCard key={club.club_id} club={club} />
        ))}
      </div>

      <div className=" flex justify-center">
        <Link
          to="/clubs/create"
          className="px-6 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          + Create New Club
        </Link>
      </div>
    </div>
  );
}

function ClubCard({ club }: { club: any }) {
  const { user, refreshUser } = useAuth();
  async function join_club(club_id: number) {
    try {
      const res = await api.post(`/clubs/join`, {
        club_id,
      });
      await refreshUser();
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all">
      {/* Cover Image with Logo */}
      <div className="relative h-32 bg-blue-600 dark:bg-blue-800 overflow-hidden">
        <img
          src={club.cover_image}
          alt={club.club_club_name}
          className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
        />
        <img
          src={club.logo}
          alt={club.club_name}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 size-20 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="pt-12 pb-5 px-5 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {club.club_name}
        </h3>

        <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 mb-3">
          {club.category}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {club.description}
        </p>

        <div className="flex items-center justify-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          <Users className="size-4" />
          <span>{club.members} members</span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/clubs/${club.club_id}`}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
          <button
            onClick={() => join_club(club.club_id)}
            disabled={club.invite_only || !user}
            className={`flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium
             ${
               club.invite_only ||
               !user ||
               user.clubs.some((c) => c.club_id === club.club_id)
                 ? "bg-gray-400 cursor-not-allowed text-white hover:bg-gray"
                 : "bg-blue-600 hover:bg-blue-700 text-white"
             }`}
          >
            {!user ? (
              <>Login to Join</>
            ) : (
              <>
                {user.clubs.some((c) => c.club_id === club.club_id) ? (
                  <>Joined</>
                ) : (
                  <>{!club.invite_only ? <>Join Club</> : <>Invite Only</>}</>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

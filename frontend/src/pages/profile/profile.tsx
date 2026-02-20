import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { Camera } from "lucide-react";
import api from "../../lib/api";
import { User } from "../../lib/auth-context";

export function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    setName(user?.name as any);
    setEmail(user?.email as any);
  }, [user]);
  if (!user) return null;

  async function on_submit(e: any) {
    e.preventDefault();
    try {
      const res = await api.post("/users/update", {
        username: name,
        email: email,
        profile_pic: "",
      });

      await refreshUser();
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Profile Settings
      </h2>

      {/* Avatar */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={
              user.profile_pic ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
            }
            alt={user.name}
            className="size-24 rounded-full"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            <Camera className="size-4" />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{email}</p>
        </div>
      </div>

      {/* Form */}
      <form className="update_form space-y-6" onSubmit={on_submit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="student-id"
            className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
          >
            Student ID
          </label>
          <input
            id="student-id"
            type="text"
            value={user.id}
            disabled
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

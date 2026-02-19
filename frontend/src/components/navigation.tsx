import { Link, useNavigate } from 'react-router';
import { Search, Sun, Moon, Calendar, ChevronDown, User, BookMarked, Users, LogOut, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../lib/theme-context';
import { useAuth } from '../lib/auth-context';
import { useState, useRef, useEffect } from 'react';

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isClubMember } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      console.log(user?.adminClubs[0]);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async() => {
    await logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // Mock search results
  const searchResults = searchQuery.length > 0 ? [
    { type: 'event', name: 'Tech Fest 2026', id: '1' },
    { type: 'event', name: 'Annual Drama Night', id: '2' },
    { type: 'club', name: 'Tech Club', id: 'tech-club' },
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Calendar className="size-8 text-blue-600 dark:text-blue-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">EBMS</span>
            </Link>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link to="/events" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Events
              </Link>
              <Link to="/clubs" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Clubs
              </Link>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events or clubs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                  {searchResults.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      to={result.type === 'event' ? `/events/${result.id}` : `/clubs/${result.id}`}
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{result.type}</div>
                      <div className="text-gray-900 dark:text-white">{result.name}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="size-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="size-5 text-gray-400" />
              )}
            </button>

            {user ? (
              <>
                {/* Create Event Button (for club members) */}
                {isClubMember && (
                  <Link
                    to="/events/create"
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Calendar className="size-4" />
                    Create Event
                  </Link>
                )}

                {/* User Menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <img
                      src={user.profile_pic || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                      alt={user.name}
                      className="size-8 rounded-full"
                    />
                    <span className="hidden md:inline text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                    <ChevronDown className="size-4 text-gray-600 dark:text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <User className="size-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/profile/bookings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <BookMarked className="size-4" />
                        My Bookings
                      </Link>
                      <Link
                        to="/profile/clubs"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <Users className="size-4" />
                        My Clubs
                      </Link>
                      {user.adminClubs.length > 0 && (
                        <Link
                          to={`/clubs/${user.adminClubs[0].club_id}/dashboard`}
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700"
                        >
                          <LayoutDashboard className="size-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 border-t border-gray-200 dark:border-gray-700"
                      >
                        <LogOut className="size-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

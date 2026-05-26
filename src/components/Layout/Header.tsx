import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Bell, Sun, Moon, ChevronDown, LogOut, User, Menu } from 'lucide-react';

interface HeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Header({ isOpen, onToggle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const mockNotifications = [
    { id: 1, message: 'Your leave request has been approved', time: '2 hours ago', icon: '✓' },
    { id: 2, message: 'New policy document uploaded', time: '5 hours ago', icon: '📄' },
    { id: 3, message: 'Upcoming holiday: Independence Day', time: '1 day ago', icon: '🎉' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const goToPersonalInfo = () => {
    navigate('/personal-info');
    setShowProfileMenu(false);
  };

  return (
    <header className={`fixed top-0 right-0 left-0 ${isOpen ? 'lg:left-64' : 'lg:left-20'} h-16 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 z-30 shadow-sm transition-all duration-300`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Side: Toggle Button */}
        <div className="flex items-center">
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600 transition"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600 transition"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden z-50">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 font-semibold">
                  Notifications
                </div>
                <div className="max-h-fit overflow-y-auto scrollbar-thin divide-y divide-gray-200 dark:divide-dark-700">
                  {mockNotifications.map(notif => (
                    <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-700 transition cursor-pointer">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{notif.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 dark:bg-dark-700 px-4 py-2 text-center text-sm text-red-600 dark:text-red-400 hover:text-red-700 cursor-pointer font-medium">
                  View All
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition"
            >
              <img
                src={user?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-64 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden z-50">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-4 flex items-center gap-3">
                  <img
                    src={user?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-red-100">{user?.email}</p>
                  </div>
                </div>

                <div className="p-2 space-y-1">
                  <button
                    onClick={goToPersonalInfo}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

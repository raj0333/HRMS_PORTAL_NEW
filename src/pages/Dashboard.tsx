import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users, Calendar, DollarSign, TrendingUp, CheckCircle,
  AlertCircle, Clock, Heart
} from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { icon: Users, label: 'Total Employees', value: '245', change: '+12', color: 'blue' },
    { icon: Calendar, label: 'Present Today', value: '198', change: '+5', color: 'green' },
    { icon: AlertCircle, label: 'On Leave', value: '32', change: '-2', color: 'orange' },
    { icon: TrendingUp, label: 'This Month Payroll', value: '$124.5K', change: '+8%', color: 'purple' },
  ];

  const recentActivities = [
    { id: 1, type: 'leave', message: 'Leave request approved', employee: 'John Doe', time: '2 hours ago' },
    { id: 2, type: 'onboarding', message: 'New employee onboarded', employee: 'Sarah Smith', time: '4 hours ago' },
    { id: 3, type: 'attendance', message: 'Attendance marked', employee: 'Mike Johnson', time: '6 hours ago' },
    { id: 4, type: 'payroll', message: 'Payroll processed', employee: 'All Employees', time: '1 day ago' },
  ];

  const upcomingHolidays = [
    { date: 'Aug 15', name: 'Independence Day', days: 'Today' },
    { date: 'Aug 26', name: 'Janmashtami', days: 'in 11 days' },
    { date: 'Sep 16', name: 'Milad un-Nabi', days: 'in 32 days' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-xl text-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-red-100">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/20' :
                  stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/20' :
                  'bg-purple-100 dark:bg-purple-900/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                    'text-purple-600 dark:text-purple-400'
                  }`} />
                </div>
                <span className={`text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-700 dark:to-dark-800 px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activities</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-dark-700">
            {recentActivities.map(activity => (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{activity.message}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.employee}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Holidays */}
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-700 dark:to-dark-800 px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Holidays</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-dark-700">
            {upcomingHolidays.map((holiday, idx) => (
              <div key={idx} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{holiday.name}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium">
                    {holiday.days}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{holiday.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: 'Working Hours', color: 'blue' },
          { icon: Heart, label: 'Feedback', color: 'pink' },
          { icon: Calendar, label: 'My Leaves', color: 'green' },
          { icon: Users, label: 'Team', color: 'purple' },
        ].map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              className={`p-4 rounded-lg border transition hover:shadow-md ${
                action.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/30' :
                action.color === 'pink' ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-900/30 hover:bg-pink-100 dark:hover:bg-pink-900/30' :
                action.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/30' :
                'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/30'
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${
                action.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                action.color === 'pink' ? 'text-pink-600 dark:text-pink-400' :
                action.color === 'green' ? 'text-green-600 dark:text-green-400' :
                'text-purple-600 dark:text-purple-400'
              }`} />
              <p className="text-xs font-semibold text-gray-900 dark:text-white">{action.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

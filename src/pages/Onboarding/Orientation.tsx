import React, { useState } from 'react';
import { CheckCircle, Circle, FileText, Users } from 'lucide-react';

interface OrientationSession {
  id: string;
  employeeName: string;
  employeeId: string;
  sessionDate: string;
  status: 'pending' | 'completed' | 'scheduled';
  tasks: string[];
}

export function Orientation() {
  const [sessions, setSessions] = useState<OrientationSession[]>([
    {
      id: '1',
      employeeName: 'Rahul Sharma',
      employeeId: 'EMP1001',
      sessionDate: '2024-08-15',
      status: 'scheduled',
      tasks: [
        'Company overview presentation',
        'HR policies briefing',
        'Office tour',
        'Team introductions',
        'Profile creation in HRMS',
      ],
    },
  ]);

  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const toggleSession = (id: string) => {
    setExpandedSession(expandedSession === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'scheduled':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orientation</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage employee orientation sessions</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Sessions', value: '12', icon: Users },
          { label: 'Completed', value: '8', icon: CheckCircle },
          { label: 'Pending', value: '4', icon: Circle },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-red-500 opacity-20" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map(session => (
          <div
            key={session.id}
            className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden"
          >
            <button
              onClick={() => toggleSession(session.id)}
              className="w-full p-6 hover:bg-gray-50 dark:hover:bg-dark-700 transition text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{session.employeeName}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(session.status)}`}>
                      {session.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ID: {session.employeeId} | Date: {session.sessionDate}</p>
                </div>
              </div>
            </button>

            {expandedSession === session.id && (
              <div className="border-t border-gray-200 dark:border-dark-700 p-6 bg-gray-50 dark:bg-dark-700/50">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Orientation Tasks:</h4>
                <div className="space-y-2">
                  {session.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-900/30">
        <div className="flex gap-4">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Orientation Process</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
              <li>Induction session by HR team</li>
              <li>Company overview and values</li>
              <li>HR policies and code of conduct</li>
              <li>Office tour and team introduction</li>
              <li>Create employee profile in HRMS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

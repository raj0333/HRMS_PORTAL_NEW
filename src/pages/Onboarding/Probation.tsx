import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react';

interface ProbationEmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  joiningDate: string;
  endDate: string;
  daysRemaining: number;
  performance: 'excellent' | 'good' | 'satisfactory' | 'poor';
  feedback: string;
  status: 'ongoing' | 'completed' | 'extended';
  checkIns: number;
}

export function Probation() {
  const [employees, setEmployees] = useState<ProbationEmployee[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      position: 'Software Engineer',
      department: 'IT',
      joiningDate: '2024-05-15',
      endDate: '2024-11-15',
      daysRemaining: 143,
      performance: 'excellent',
      feedback: 'Good technical skills, quick learner, excellent collaboration',
      status: 'ongoing',
      checkIns: 3,
    },
    {
      id: '2',
      name: 'Priya Singh',
      position: 'HR Executive',
      department: 'HR',
      joiningDate: '2024-04-10',
      endDate: '2024-10-10',
      daysRemaining: 107,
      performance: 'good',
      feedback: 'Strong communication, good work ethic, needs improvement in decision making',
      status: 'ongoing',
      checkIns: 4,
    },
  ]);

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'good':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'satisfactory':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'poor':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Probation Period Monitoring</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track employee performance during probation period</p>
      </div>

      {/* Employee Cards */}
      <div className="space-y-6">
        {employees.map(emp => (
          <div key={emp.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6 hover:shadow-lg transition">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Info */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{emp.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{emp.position}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{emp.department}</p>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-dark-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Joined:</span> {emp.joiningDate}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Period Ends:</span> {emp.endDate}
                  </p>
                </div>
              </div>

              {/* Performance */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Performance</h4>
                <div className="space-y-2">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPerformanceColor(emp.performance)}`}>
                      {emp.performance.toUpperCase()}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-dark-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Check-ins: {emp.checkIns}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(Math.min(emp.checkIns, 5))].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-green-500" />
                      ))}
                      {[...Array(Math.max(0, 5 - emp.checkIns))].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-dark-600" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Progress</h4>
                <div className="relative">
                  <div className="w-full h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-red-700" style={{ width: `${100 - (emp.daysRemaining / 180) * 100}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-medium">{emp.daysRemaining}</span> days remaining
                  </p>
                  <button className="mt-3 w-full px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 font-medium text-sm transition">
                    Schedule Check-in
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Manager Feedback</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{emp.feedback}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guidelines */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-900/30">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">Probation Period Activities</h3>
            <ul className="text-sm text-green-800 dark:text-green-400 space-y-1 list-disc list-inside">
              <li>Regular check-ins with employee and manager (monthly)</li>
              <li>Performance feedback collection</li>
              <li>Address concerns and issues raised by employee</li>
              <li>Maintain attendance and performance records</li>
              <li>Prepare confirmation or extension documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TrainingSession {
  id: string;
  title: string;
  description: string;
  duration: string;
  employees: number;
  status: 'scheduled' | 'ongoing' | 'completed';
}

export function Training() {
  const [trainings] = useState<TrainingSession[]>([
    { id: '1', title: 'Company Induction', description: 'Basic company overview and policies', duration: '4 hours', employees: 12, status: 'completed' },
    { id: '2', title: 'System Access Training', description: 'HRMS, email, and software systems', duration: '2 hours', employees: 8, status: 'ongoing' },
    { id: '3', title: 'Department-Specific Training', description: 'Role-specific skills and processes', duration: '8 hours', employees: 5, status: 'scheduled' },
  ]);

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === 'ongoing') return <BookOpen className="w-4 h-4 text-blue-500" />;
    return <Clock className="w-4 h-4 text-orange-500" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'ongoing':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'scheduled':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Training & System Access</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage training sessions and system access for employees</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Scheduled', value: '15', icon: Clock },
          { label: 'Ongoing', value: '8', icon: BookOpen },
          { label: 'Completed', value: '45', icon: CheckCircle },
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

      {/* Training Sessions */}
      <div className="space-y-4">
        {trainings.map(training => (
          <div key={training.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{training.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{training.description}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(training.status)}`}>
                {getStatusIcon(training.status)}
                {training.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-dark-700">
              <span>Duration: {training.duration}</span>
              <span>Employees: {training.employees}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Users, Target, Badge, Clock } from 'lucide-react';

export function DepartmentIntro() {
  const departments = [
    { name: 'IT', head: 'Rahul Sharma', members: 25, description: 'Software development and infrastructure' },
    { name: 'HR', head: 'Priya Singh', members: 8, description: 'Human resources and administration' },
    { name: 'Sales', head: 'Mike Johnson', members: 15, description: 'Business development and client relations' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Department Introduction</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Introduce employees to their departments and teams</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept, idx) => (
          <div key={idx} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{dept.name}</h3>
              <Badge className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{dept.description}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">{dept.members}</span> Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Head: <span className="font-semibold">{dept.head}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Department Intro Checklist</h2>
        <div className="space-y-3">
          {[
            'Introduce reporting manager and team members',
            'Share department goals and responsibilities',
            'Coordinate with manager for role briefing',
            'Ensure access to required tools and software',
          ].map((task, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-700">
              <input type="checkbox" className="w-5 h-5 rounded accent-red-500" />
              <span className="text-gray-900 dark:text-white font-medium">{task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

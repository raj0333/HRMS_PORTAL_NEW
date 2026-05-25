import React, { useState } from 'react';
import { CheckCircle, FileText, DollarSign, Award } from 'lucide-react';

interface ConfirmationEmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  probationEndDate: string;
  performance: string;
  status: 'pending' | 'confirmed' | 'rejected';
  managerReview: string;
  finalSalary: number;
}

export function Confirmation() {
  const [employees, setEmployees] = useState<ConfirmationEmployee[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      position: 'Software Engineer',
      department: 'IT',
      probationEndDate: '2024-11-15',
      performance: 'Excellent - Exceeds expectations',
      status: 'pending',
      managerReview: 'Rahul has demonstrated strong technical skills and excellent integration with the team. Recommended for confirmation with salary increase.',
      finalSalary: 52500,
    },
    {
      id: '2',
      name: 'Priya Singh',
      position: 'HR Executive',
      department: 'HR',
      probationEndDate: '2024-10-10',
      performance: 'Good - Meets expectations',
      status: 'confirmed',
      managerReview: 'Priya has shown good work ethic and communication skills. Ready for confirmation.',
      finalSalary: 62000,
    },
  ]);

  const handleConfirm = (id: string) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, status: 'confirmed' as const } : e));
  };

  const handleReject = (id: string) => {
    if (confirm('Are you sure you want to reject this employee? This action cannot be undone.')) {
      setEmployees(employees.map(e => e.id === id ? { ...e, status: 'rejected' as const } : e));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Confirmation Process</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Complete employee confirmation after probation period</p>
      </div>

      {/* Employee Cards */}
      <div className="space-y-6">
        {employees.map(emp => (
          <div key={emp.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-red-500 to-red-700 p-4 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{emp.name}</h3>
                  <p className="text-sm text-red-100">{emp.position} - {emp.department}</p>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(emp.status)}`}>
                  {emp.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Performance Review */}
              <div className="border-b border-gray-200 dark:border-dark-700 pb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Performance Review
                </h4>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">{emp.performance}</p>
                <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-900 dark:text-white">{emp.managerReview}</p>
                </div>
              </div>

              {/* Probation Details */}
              <div className="border-b border-gray-200 dark:border-dark-700 pb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Probation Details
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Period Ends:</span> {emp.probationEndDate}
                </p>
              </div>

              {/* Salary Details */}
              <div className="pb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Confirmed Salary
                </h4>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-green-700 dark:text-green-400">${emp.finalSalary.toLocaleString()}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">Monthly base salary after confirmation</p>
                </div>
              </div>

              {/* Actions */}
              {emp.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-dark-700">
                  <button
                    onClick={() => handleConfirm(emp.id)}
                    className="flex-1 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 font-medium transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Confirm Employee
                  </button>
                  <button
                    onClick={() => handleReject(emp.id)}
                    className="flex-1 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              )}

              {emp.status === 'confirmed' && (
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-300">Confirmed</p>
                    <p className="text-sm text-green-800 dark:text-green-400">This employee has been confirmed in their position</p>
                  </div>
                </div>
              )}

              {emp.status === 'rejected' && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 flex items-start gap-3">
                  <FileText className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-300">Rejected</p>
                    <p className="text-sm text-red-800 dark:text-red-400">Employee has been rejected after probation period</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Process Steps */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-900/30">
        <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-4">Confirmation Process Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Collect Review', desc: 'Gather performance review from manager' },
            { step: '2', title: 'Evaluate', desc: 'Assess employee performance and conduct' },
            { step: '3', title: 'Approve', desc: 'Get HR approval for confirmation' },
            { step: '4', title: 'Issue Letter', desc: 'Send confirmation letter to employee' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mx-auto mb-2">
                {item.step}
              </div>
              <p className="font-semibold text-blue-900 dark:text-blue-300 text-sm mb-1">{item.title}</p>
              <p className="text-xs text-blue-800 dark:text-blue-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

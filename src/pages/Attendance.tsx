import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'half_day' | 'holiday';
  workingHours: number;
}

export function Attendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    {
      id: '1',
      employeeId: 'EMP1001',
      employeeName: 'Rahul Sharma',
      date: '2024-08-20',
      checkIn: '09:30',
      checkOut: '18:45',
      status: 'present',
      workingHours: 9.25,
    },
    {
      id: '2',
      employeeId: 'EMP1002',
      employeeName: 'Priya Singh',
      date: '2024-08-20',
      checkIn: '10:15',
      checkOut: '14:00',
      status: 'half_day',
      workingHours: 3.75,
    },
    {
      id: '3',
      employeeId: 'EMP1003',
      employeeName: 'Mike Johnson',
      date: '2024-08-20',
      checkIn: '00:00',
      status: 'absent',
      workingHours: 0,
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'half_day':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'absent':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      case 'half_day':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'holiday':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track employee attendance and working hours</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Employees', value: '245', icon: CheckCircle, color: 'green' },
          { label: 'Present Today', value: '210', icon: CheckCircle, color: 'green' },
          { label: 'Absent', value: '15', icon: XCircle, color: 'red' },
          { label: 'Half Day', value: '20', icon: Clock, color: 'orange' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 opacity-20 ${
                  stat.color === 'green' ? 'text-green-500' :
                  stat.color === 'red' ? 'text-red-500' :
                  'text-orange-500'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Working Hours</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {attendance.map(record => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{record.employeeName}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{record.date}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{record.checkIn}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{record.checkOut || '-'}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{record.workingHours} hrs</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

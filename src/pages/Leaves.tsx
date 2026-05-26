import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Clock, XCircle, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
}

export function Leaves() {
  const [searchParams] = useSearchParams();
  const [leaves, setLeaves] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeId: 'EMP1001',
      employeeName: 'Rahul Sharma',
      leaveType: 'Casual Leave',
      startDate: '2024-08-21',
      endDate: '2024-08-23',
      reason: 'Personal work',
      days: 3,
      status: 'pending',
    },
    {
      id: '2',
      employeeId: 'EMP1002',
      employeeName: 'Priya Singh',
      leaveType: 'Sick Leave',
      startDate: '2024-08-20',
      endDate: '2024-08-20',
      reason: 'Medical appointment',
      days: 1,
      status: 'approved',
    },
  ]);

  const [showApplyModal, setShowApplyModal] = useState(searchParams.get('action') === 'apply');
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    if (searchParams.get('action') === 'apply') {
      setShowApplyModal(true);
    }
  }, [searchParams]);

  const calculateDays = (start: string, end: string) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(1, days);
    }
    return 0;
  };

  const handleApplyLeave = () => {
    if (formData.employeeName && formData.startDate && formData.endDate && formData.reason) {
      const days = calculateDays(formData.startDate, formData.endDate);
      const newRequest: LeaveRequest = {
        id: Date.now().toString(),
        employeeId: `EMP${1000 + Math.floor(Math.random() * 9000)}`,
        employeeName: formData.employeeName,
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        days,
        status: 'pending',
      };
      setLeaves([...leaves, newRequest]);
      setFormData({ employeeName: '', leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
      setShowApplyModal(false);
    }
  };

  const handleApprove = (id: string) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'approved' as const } : l));
  };

  const handleReject = (id: string) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'rejected' as const } : l));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage employee leave requests</p>
        </div>
        <button
          onClick={() => setShowApplyModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Apply Leave
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: '48', color: 'blue' },
          { label: 'Approved', value: leaves.filter(l => l.status === 'approved').length.toString(), color: 'green' },
          { label: 'Pending', value: leaves.filter(l => l.status === 'pending').length.toString(), color: 'orange' },
          { label: 'Rejected', value: leaves.filter(l => l.status === 'rejected').length.toString(), color: 'red' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${
              stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
              stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
              stat.color === 'red' ? 'text-red-600 dark:text-red-400' :
              'text-blue-600 dark:text-blue-400'
            }`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Leaves Table */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="overflow-x-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Leave Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">From</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">To</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Days</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {leaves.map(leave => (
                <tr key={leave.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{leave.employeeName}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{leave.leaveType}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{leave.startDate}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{leave.endDate}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{leave.days}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm max-w-xs truncate">{leave.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(leave.status)}`}>
                      {getStatusIcon(leave.status)}
                      {leave.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {leave.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(leave.id)}
                          className="px-2 py-1 text-xs rounded bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-200 font-medium"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(leave.id)}
                          className="px-2 py-1 text-xs rounded bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-0 !m-0">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-2xl border border-gray-200 dark:border-dark-700 max-h-fit overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for Leave</h2>
              <button onClick={() => setShowApplyModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type</label>
                <select
                  value={formData.leaveType}
                  onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
                >
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Earned Leave</option>
                  <option>Maternity Leave</option>
                  <option>Paternity Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500 dark:[color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500 dark:[color-scheme:dark]"
                  />
                </div>
              </div>

              {formData.startDate && formData.endDate && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium">
                  Total Days: {calculateDays(formData.startDate, formData.endDate)}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason</label>
                <textarea
                  placeholder="Reason for leave"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-dark-700">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyLeave}
                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium transition"
              >
                Submit Leave Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

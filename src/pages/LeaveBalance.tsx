import React, { useState } from 'react';
import { Heart, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LeaveBalanceItem {
  leaveType: string;
  total: number;
  used: number;
  pending: number;
  available: number;
  carryForward: number;
}

export function LeaveBalance() {
  const [balances] = useState<LeaveBalanceItem[]>([
    { leaveType: 'Casual Leave', total: 12, used: 3, pending: 1, available: 8, carryForward: 0 },
    { leaveType: 'Sick Leave', total: 10, used: 2, pending: 0, available: 8, carryForward: 2 },
    { leaveType: 'Earned Leave', total: 15, used: 5, pending: 2, available: 8, carryForward: 5 },
    { leaveType: 'Maternity Leave', total: 180, used: 0, pending: 0, available: 180, carryForward: 0 },
    { leaveType: 'Paternity Leave', total: 15, used: 0, pending: 0, available: 15, carryForward: 0 },
  ]);

  const totalLeaves = balances.reduce((sum, b) => sum + b.total, 0);
  const totalUsed = balances.reduce((sum, b) => sum + b.used, 0);
  const totalPending = balances.reduce((sum, b) => sum + b.pending, 0);
  const totalAvailable = balances.reduce((sum, b) => sum + b.available, 0);

  const getUtilizationColor = (used: number, total: number) => {
    const ratio = used / total;
    if (ratio > 0.75) return 'text-red-600 dark:text-red-400';
    if (ratio > 0.5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getProgressBarColor = (used: number, total: number) => {
    const ratio = used / total;
    if (ratio > 0.75) return 'bg-red-500';
    if (ratio > 0.5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Balance</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">View your leave balance and utilization</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Leaves</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalLeaves}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
              <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Used</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{totalUsed}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/20">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{totalPending}</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/20">
              <Minus className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Available</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalAvailable}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Leave Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {balances.map((balance, idx) => (
          <div key={idx} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">{balance.leaveType}</h3>
              <span className={`text-sm font-semibold ${getUtilizationColor(balance.used, balance.total)}`}>
                {((balance.used / balance.total) * 100).toFixed(0)}% used
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden mb-4">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(balance.used, balance.total)}`}
                style={{ width: `${(balance.used / balance.total) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-dark-700 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                <p className="font-bold text-gray-900 dark:text-white">{balance.total}</p>
              </div>
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/10 text-center">
                <p className="text-xs text-red-600 dark:text-red-400">Used</p>
                <p className="font-bold text-red-700 dark:text-red-400">{balance.used}</p>
              </div>
              <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 text-center">
                <p className="text-xs text-yellow-600 dark:text-yellow-400">Pending</p>
                <p className="font-bold text-yellow-700 dark:text-yellow-400">{balance.pending}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/10 text-center">
                <p className="text-xs text-green-600 dark:text-green-400">Available</p>
                <p className="font-bold text-green-700 dark:text-green-400">{balance.available}</p>
              </div>
            </div>

            {balance.carryForward > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-dark-700 text-center">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  Carry Forward: {balance.carryForward} days
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Leave Policy Notes</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
          <li>Casual leaves cannot be carried forward to the next year</li>
          <li>Sick leaves can be carried forward up to 2 days per year</li>
          <li>Earned leaves can be carried forward up to 5 days per year</li>
          <li>Maternity/Paternity leaves are one-time entitlements</li>
          <li>Pending leaves are subject to approval</li>
        </ul>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Download, FileText, Plus, DollarSign } from 'lucide-react';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  bonuses: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
}

export function Payroll() {
  const [payroll, setPayroll] = useState<PayrollRecord[]>([
    {
      id: '1',
      employeeId: 'EMP1001',
      employeeName: 'Rahul Sharma',
      month: 'August 2024',
      baseSalary: 50000,
      allowances: 5000,
      deductions: 3000,
      bonuses: 2000,
      netSalary: 54000,
      status: 'paid',
    },
    {
      id: '2',
      employeeId: 'EMP1002',
      employeeName: 'Priya Singh',
      month: 'August 2024',
      baseSalary: 60000,
      allowances: 7000,
      deductions: 4000,
      bonuses: 3000,
      netSalary: 66000,
      status: 'processed',
    },
    {
      id: '3',
      employeeId: 'EMP1003',
      employeeName: 'Mike Johnson',
      month: 'August 2024',
      baseSalary: 45000,
      allowances: 4000,
      deductions: 2500,
      bonuses: 1500,
      netSalary: 48000,
      status: 'pending',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'processed':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const totalPayroll = payroll.reduce((sum, p) => sum + p.netSalary, 0);
  const avgSalary = Math.round(totalPayroll / payroll.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payroll Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Process and manage employee salaries</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-lg transition">
          <Plus className="w-5 h-5" />
          Process Payroll
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Payroll', value: `$${totalPayroll.toLocaleString()}`, icon: DollarSign, color: 'red' },
          { label: 'Processed', value: payroll.filter(p => p.status === 'processed').length.toString(), icon: FileText, color: 'blue' },
          { label: 'Pending', value: payroll.filter(p => p.status === 'pending').length.toString(), icon: FileText, color: 'orange' },
          { label: 'Average Salary', value: `$${avgSalary.toLocaleString()}`, icon: DollarSign, color: 'green' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${
                    stat.color === 'red' ? 'text-red-600 dark:text-red-400' :
                    stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                    'text-green-600 dark:text-green-400'
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <Icon className={`w-8 h-8 opacity-20 ${
                  stat.color === 'red' ? 'text-red-500' :
                  stat.color === 'blue' ? 'text-blue-500' :
                  stat.color === 'orange' ? 'text-orange-500' :
                  'text-green-500'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Payroll Table */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Month</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Base</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Allowances</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Deductions</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Bonus</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Net Salary</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {payroll.map(record => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{record.employeeName}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{record.month}</td>
                  <td className="px-6 py-4 text-right text-gray-900 dark:text-white font-medium">${record.baseSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-green-600 dark:text-green-400 font-medium">+${record.allowances.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-red-600 dark:text-red-400 font-medium">-${record.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-blue-600 dark:text-blue-400 font-medium">+${record.bonuses.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white text-lg">${record.netSalary.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition" title="Download payslip">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Components Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-900/30">
        <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-3">Salary Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-medium">Base Salary</p>
            <p className="text-blue-900 dark:text-blue-200">Fixed monthly compensation</p>
          </div>
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-medium">Allowances</p>
            <p className="text-blue-900 dark:text-blue-200">HRA, DA, and other benefits</p>
          </div>
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-medium">Deductions</p>
            <p className="text-blue-900 dark:text-blue-200">Tax, insurance, loan EMI</p>
          </div>
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-medium">Bonuses</p>
            <p className="text-blue-900 dark:text-blue-200">Performance and incentives</p>
          </div>
        </div>
      </div>
    </div>
  );
}

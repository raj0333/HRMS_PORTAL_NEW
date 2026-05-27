import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, Package } from 'lucide-react';

interface AssetAllocation {
  id: string;
  employeeId: string;
  employeeName: string;
  assetType: string;
  serialNumber: string;
  status: 'pending' | 'assigned' | 'returned';
  allocationDate: string;
}

export function AssetSetup() {
  const [assets, setAssets] = useState<AssetAllocation[]>([
    { id: '1', employeeId: 'EMP1001', employeeName: 'Rahul Sharma', assetType: 'Laptop', serialNumber: 'LT-001', status: 'assigned', allocationDate: '2024-08-15' },
    { id: '2', employeeId: 'EMP1001', employeeName: 'Rahul Sharma', assetType: 'Mobile', serialNumber: 'MB-001', status: 'pending', allocationDate: '2024-08-15' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    assetType: '',
    serialNumber: '',
    allocationDate: new Date().toISOString().split('T')[0],
  });

  const handleAddAsset = () => {
    if (formData.employeeName && formData.assetType && formData.serialNumber) {
      const newAllocation: AssetAllocation = {
        id: Date.now().toString(),
        ...formData,
        status: 'assigned',
      };
      setAssets([newAllocation, ...assets]);
      setFormData({ 
        employeeId: '', 
        employeeName: '', 
        assetType: '', 
        serialNumber: '', 
        allocationDate: new Date().toISOString().split('T')[0] 
      });
      setShowAddModal(false);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'assigned') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === 'pending') return <Clock className="w-4 h-4 text-orange-500" />;
    return <Package className="w-4 h-4 text-gray-500" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'returned':
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Asset Setup</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage IT assets and equipment allocation</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Allocate Asset
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Assets</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">48</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Assigned</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">42</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">6</p>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Asset Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {assets.map(asset => (
                <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{asset.employeeName}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{asset.employeeId}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{asset.assetType}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{asset.serialNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(asset.status)}`}>
                      {getStatusIcon(asset.status)}
                      {asset.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{asset.allocationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocate Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 !m-0">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-dark-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Allocate New Asset</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee Name</label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Enter employee name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee ID</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="e.g. EMP1001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Asset Type</label>
                <select
                  value={formData.assetType}
                  onChange={(e) => setFormData({ ...formData, assetType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select Asset Type</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Headset">Headset</option>
                  <option value="Monitor">Monitor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Serial Number</label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Enter serial number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Allocation Date</label>
                <input
                  type="date"
                  value={formData.allocationDate}
                  onChange={(e) => setFormData({ ...formData, allocationDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none dark:[color-scheme:dark]"
                  title="Allocation Date"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAsset}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium transition"
              >
                Allocate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

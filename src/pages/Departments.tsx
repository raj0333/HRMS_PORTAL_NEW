import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  employees: number;
  budget: number;
  location: string;
}

export function Departments() {
  const [searchParams] = useSearchParams();
  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'Information Technology', description: 'Software development and infrastructure', head: 'Rahul Sharma', employees: 25, budget: 500000, location: 'New Delhi' },
    { id: '2', name: 'Human Resources', description: 'HR operations and employee management', head: 'Priya Singh', employees: 8, budget: 150000, location: 'New Delhi' },
    { id: '3', name: 'Sales', description: 'Business development and client relations', head: 'Mike Johnson', employees: 15, budget: 300000, location: 'Mumbai' },
  ]);

  const [showAddModal, setShowAddModal] = useState(searchParams.get('action') === 'add');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    head: '',
    budget: '',
    location: '',
  });

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setShowAddModal(true);
    }
  }, [searchParams]);

  const handleAddDepartment = () => {
    if (formData.name && formData.head) {
      const newDept: Department = {
        id: Date.now().toString(),
        ...formData,
        budget: parseFloat(formData.budget) || 0,
        employees: 0,
      };
      setDepartments([...departments, newDept]);
      resetForm();
      setShowAddModal(false);
    }
  };

  const handleEditDepartment = () => {
    if (selectedDept && formData.name && formData.head) {
      setDepartments(departments.map(d => d.id === selectedDept.id ? {
        ...d,
        name: formData.name,
        description: formData.description,
        head: formData.head,
        budget: parseFloat(formData.budget) || 0,
        location: formData.location,
      } : d));
      resetForm();
      setShowEditModal(false);
      setSelectedDept(null);
    }
  };

  const handleDeleteDepartment = (id: string) => {
    if (confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  const handleEditClick = (dept: Department) => {
    setSelectedDept(dept);
    setFormData({
      name: dept.name,
      description: dept.description,
      head: dept.head,
      budget: dept.budget.toString(),
      location: dept.location,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', head: '', budget: '', location: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Departments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage company departments and teams</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Department
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <div key={dept.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{dept.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{dept.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(dept)}
                  className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteDepartment(dept.id)}
                  className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-dark-700">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Department Head</p>
                <p className="text-sm text-gray-900 dark:text-white font-semibold">{dept.head}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-xs text-blue-600 dark:text-blue-400">Employees</p>
                  <p className="font-bold text-blue-900 dark:text-blue-300">{dept.employees}</p>
                </div>
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <p className="text-xs text-green-600 dark:text-green-400">Budget</p>
                  <p className="font-bold text-green-900 dark:text-green-300">${dept.budget.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">Location:</span> {dept.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-2xl border border-gray-200 dark:border-dark-700 max-h-96 overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Department</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Department Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Department Head"
                value={formData.head}
                onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="number"
                placeholder="Budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-dark-700">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDepartment}
                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium transition"
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedDept && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-2xl border border-gray-200 dark:border-dark-700 max-h-96 overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Department</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Department Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Department Head"
                value={formData.head}
                onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="number"
                placeholder="Budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-dark-700">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEditDepartment}
                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

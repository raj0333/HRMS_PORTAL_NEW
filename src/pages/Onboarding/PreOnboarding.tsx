import React, { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, Clock, AlertCircle, FileText, Mail, User } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joiningDate: string;
  reportingManager: string;
  status: 'offered' | 'accepted' | 'joining_confirmed' | 'rejected';
  documents: {
    offerLetter: boolean;
    idProof: boolean;
    bankDetails: boolean;
    educationCert: boolean;
  };
  bgvStatus: 'pending' | 'in_progress' | 'verified' | 'failed';
  employeeId?: string;
}

export function PreOnboarding() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 9876543210',
      position: 'Software Engineer',
      department: 'IT',
      joiningDate: '2024-08-15',
      reportingManager: 'John Smith',
      status: 'accepted',
      documents: { offerLetter: true, idProof: false, bankDetails: false, educationCert: false },
      bgvStatus: 'in_progress',
      employeeId: 'EMP1025',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    joiningDate: '',
    reportingManager: '',
  });

  const handleAddCandidate = () => {
    if (formData.name && formData.email && formData.position) {
      const newCandidate: Candidate = {
        id: Date.now().toString(),
        ...formData,
        status: 'offered',
        documents: { offerLetter: false, idProof: false, bankDetails: false, educationCert: false },
        bgvStatus: 'pending',
      };
      setCandidates([...candidates, newCandidate]);
      setFormData({ name: '', email: '', phone: '', position: '', department: '', joiningDate: '', reportingManager: '' });
      setShowAddModal(false);
    }
  };

  const handleAcceptOffer = (id: string) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, status: 'accepted' as const } : c));
  };

  const handleConfirmJoining = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      const newEmployeeId = `EMP${1000 + Math.floor(Math.random() * 9000)}`;
      setCandidates(candidates.map(c => c.id === id ? { ...c, status: 'joining_confirmed' as const, employeeId: newEmployeeId } : c));
    }
  };

  const handleStartBGV = (id: string) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, bgvStatus: 'in_progress' as const } : c));
  };

  const handleUploadDocument = (candidateId: string, docType: keyof Candidate['documents']) => {
    setCandidates(candidates.map(c =>
      c.id === candidateId ? { ...c, documents: { ...c.documents, [docType]: true } } : c
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'offered':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'accepted':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'joining_confirmed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getBGVStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'in_progress':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pre-Onboarding</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage candidate offers and joining formalities</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Candidate
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-dark-700 overflow-x-auto">
        {['Offer Letter', 'Documents', 'BGV', 'System Access'].map(tab => (
          <button key={tab} className="px-4 py-3 font-medium text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400 whitespace-nowrap">
            {tab}
          </button>
        ))}
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map(candidate => (
          <div key={candidate.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-red-500 to-red-700 p-4 text-white">
              <h3 className="font-bold text-lg">{candidate.name}</h3>
              <p className="text-sm text-red-100">{candidate.position}</p>
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Email:</span> {candidate.email}</p>
                <p className="text-gray-600 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Phone:</span> {candidate.phone}</p>
                <p className="text-gray-600 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Joining:</span> {candidate.joiningDate}</p>
                <p className="text-gray-600 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Manager:</span> {candidate.reportingManager}</p>
              </div>

              <div className="flex gap-2 flex-wrap pt-2 border-t border-gray-200 dark:border-dark-700">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(candidate.status)}`}>
                  {candidate.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getBGVStatusColor(candidate.bgvStatus)}`}>
                  BGV: {candidate.bgvStatus.toUpperCase()}
                </span>
              </div>

              {candidate.employeeId && (
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                  <p className="text-xs text-green-700 dark:text-green-400 font-semibold">ID: {candidate.employeeId}</p>
                </div>
              )}

              <button
                onClick={() => {
                  setSelectedCandidate(candidate);
                  setShowDetailsModal(true);
                }}
                className="w-full px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 font-medium text-sm transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-2xl border border-gray-200 dark:border-dark-700 max-h-96 overflow-y-auto scrollbar-thin">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add New Candidate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
              />
              <input
                type="date"
                placeholder="Joining Date"
                value={formData.joiningDate}
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                className="px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500 dark:[color-scheme:dark]"
              />
              <input
                type="text"
                placeholder="Reporting Manager"
                value={formData.reportingManager}
                onChange={(e) => setFormData({ ...formData, reportingManager: e.target.value })}
                className="px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500 md:col-span-2"
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
                onClick={handleAddCandidate}
                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium transition"
              >
                Add Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Details Modal */}
      {showDetailsModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-xl w-full max-w-2xl border border-gray-200 dark:border-dark-700 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-700 p-4 text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                <p className="text-sm text-red-100">{selectedCandidate.position}</p>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="text-xl font-bold hover:opacity-80">×</button>
            </div>

            <div className="p-6 space-y-6">
              {/* Offer Letter Section */}
              <div className="border-b border-gray-200 dark:border-dark-700 pb-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-red-600" />
                  Offer Letter & Acceptance
                </h3>
                {selectedCandidate.status === 'offered' && (
                  <div className="flex gap-2">
                    <button onClick={() => {
                      handleAcceptOffer(selectedCandidate.id);
                      setSelectedCandidate({ ...selectedCandidate, status: 'accepted' });
                    }} className="flex-1 px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 font-medium transition">
                      Accept Offer
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 font-medium transition">
                      Reject Offer
                    </button>
                  </div>
                )}
                {selectedCandidate.status !== 'offered' && <p className="text-green-600 dark:text-green-400 font-medium">Offer accepted</p>}
              </div>

              {/* Joining Details */}
              {selectedCandidate.status === 'accepted' && (
                <div className="border-b border-gray-200 dark:border-dark-700 pb-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Joining Details</h3>
                  <div className="space-y-2 text-sm mb-3">
                    <p><span className="font-medium text-gray-900 dark:text-white">Date:</span> {selectedCandidate.joiningDate}</p>
                    <p><span className="font-medium text-gray-900 dark:text-white">Manager:</span> {selectedCandidate.reportingManager}</p>
                    <p><span className="font-medium text-gray-900 dark:text-white">Department:</span> {selectedCandidate.department}</p>
                  </div>
                  <button onClick={() => {
                    handleConfirmJoining(selectedCandidate.id);
                    setSelectedCandidate({ ...selectedCandidate, status: 'joining_confirmed', employeeId: `EMP${1000 + Math.floor(Math.random() * 9000)}` });
                  }} className="w-full px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 font-medium transition">
                    Confirm Joining
                  </button>
                </div>
              )}

              {/* Document Collection */}
              <div className="border-b border-gray-200 dark:border-dark-700 pb-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Document Collection
                </h3>
                <div className="space-y-2">
                  {[
                    { key: 'offerLetter', label: 'Offer Letter' },
                    { key: 'idProof', label: 'ID Proof (Aadhaar/PAN)' },
                    { key: 'bankDetails', label: 'Bank Details' },
                    { key: 'educationCert', label: 'Education Certificates' },
                  ].map(doc => (
                    <div key={doc.key} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-dark-700">
                      <span className="text-sm text-gray-900 dark:text-white">{doc.label}</span>
                      {selectedCandidate.documents[doc.key as keyof typeof selectedCandidate.documents] ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <button
                          onClick={() => {
                            handleUploadDocument(selectedCandidate.id, doc.key as keyof Candidate['documents']);
                            setSelectedCandidate({
                              ...selectedCandidate,
                              documents: { ...selectedCandidate.documents, [doc.key]: true }
                            });
                          }}
                          className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 font-medium"
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* BGV */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Background Verification</h3>
                <div className="flex items-center justify-between mb-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-700">
                  <span className="text-sm text-gray-900 dark:text-white">Status: {selectedCandidate.bgvStatus.toUpperCase()}</span>
                  {selectedCandidate.bgvStatus === 'pending' && (
                    <button onClick={() => {
                      handleStartBGV(selectedCandidate.id);
                      setSelectedCandidate({ ...selectedCandidate, bgvStatus: 'in_progress' });
                    }} className="text-xs px-3 py-1 rounded bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-200 font-medium">
                      Start BGV
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-dark-700 p-4">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-dark-600 font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

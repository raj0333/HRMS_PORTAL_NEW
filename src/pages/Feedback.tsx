import React, { useState, useEffect } from 'react';
import { Send, List, Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface FeedbackEntry {
  id: string;
  employeeName: string;
  category: string;
  subject: string;
  message: string;
  rating: number;
  date: string;
  status: 'submitted' | 'reviewed' | 'addressed';
}

export function Feedback() {
  const [searchParams] = useSearchParams();
  const [showHistory, setShowHistory] = useState(searchParams.get('action') === 'history');
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([
    {
      id: '1',
      employeeName: 'Rahul Sharma',
      category: 'Workplace',
      subject: 'Office ventilation improvement',
      message: 'The ventilation in the 3rd floor needs improvement. It gets very hot during afternoon hours.',
      rating: 3,
      date: '2024-08-15',
      status: 'addressed',
    },
    {
      id: '2',
      employeeName: 'Priya Singh',
      category: 'Policy',
      subject: 'Remote work policy suggestion',
      message: 'Would like to suggest a more flexible remote work policy, especially for teams that can work effectively from home.',
      rating: 4,
      date: '2024-08-18',
      status: 'reviewed',
    },
  ]);

  const [formData, setFormData] = useState({
    employeeName: '',
    category: 'Workplace',
    subject: '',
    message: '',
    rating: 0,
  });

  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (searchParams.get('action') === 'history') {
      setShowHistory(true);
    }
  }, [searchParams]);

  const handleSubmitFeedback = () => {
    if (formData.subject && formData.message && formData.rating > 0) {
      const newFeedback: FeedbackEntry = {
        id: Date.now().toString(),
        employeeName: formData.employeeName || 'Current User',
        category: formData.category,
        subject: formData.subject,
        message: formData.message,
        rating: formData.rating,
        date: new Date().toISOString().split('T')[0],
        status: 'submitted',
      };
      setFeedbacks([newFeedback, ...feedbacks]);
      setFormData({ employeeName: '', category: 'Workplace', subject: '', message: '', rating: 0 });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'addressed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'reviewed':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'submitted':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const categories = ['Workplace', 'Policy', 'Management', 'Technology', 'Benefits', 'Training', 'Other'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feedback</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Share your feedback and suggestions</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHistory(false)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${!showHistory ? 'bg-red-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'}`}
          >
            Submit Feedback
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${showHistory ? 'bg-red-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'}`}
          >
            Feedback History
          </button>
        </div>
      </div>

      {!showHistory ? (
        <>
          {/* Submit Feedback Form */}
          <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-red-600" />
              Submit New Feedback
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Brief subject of your feedback"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Feedback</label>
                <textarea
                  placeholder="Describe your feedback or suggestion in detail"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700 dark:text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 transition"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || formData.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {formData.rating > 0 ? `${formData.rating}/5` : 'Select rating'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmitFeedback}
                disabled={!formData.subject || !formData.message || formData.rating === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
              >
                <Send className="w-5 h-5" />
                Submit Feedback
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                  <MessageSquare className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Feedback</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{feedbacks.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <ThumbsUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reviewed</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{feedbacks.filter(f => f.status === 'reviewed').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avg Rating</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : '0'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            {feedbacks.map(fb => (
              <div key={fb.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{fb.subject}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {fb.employeeName} - {fb.category} - {fb.date}
                    </p>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(fb.status)}`}>
                    {fb.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{fb.message}</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

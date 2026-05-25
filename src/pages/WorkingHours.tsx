import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, Square, Calendar, Timer } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface TimeEntry {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  status: 'completed' | 'in_progress' | 'absent';
}

export function WorkingHours() {
  const [searchParams] = useSearchParams();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showTimesheet, setShowTimesheet] = useState(searchParams.get('action') === 'timesheet');

  useEffect(() => {
    if (searchParams.get('action') === 'timesheet') {
      setShowTimesheet(true);
    }
  }, [searchParams]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && !isTimerPaused) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isTimerPaused]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    { id: '1', date: '2024-08-19', checkIn: '09:00', checkOut: '18:00', totalHours: '9:00', status: 'completed' },
    { id: '2', date: '2024-08-20', checkIn: '09:15', checkOut: '18:30', totalHours: '9:15', status: 'completed' },
    { id: '3', date: '2024-08-21', checkIn: '09:00', checkOut: '17:30', totalHours: '8:30', status: 'completed' },
    { id: '4', date: '2024-08-22', checkIn: '08:45', checkOut: '-', totalHours: '-', status: 'in_progress' },
  ]);

  const handleStart = () => {
    setIsTimerRunning(true);
    setIsTimerPaused(false);
  };

  const handlePause = () => {
    setIsTimerPaused(true);
  };

  const handleResume = () => {
    setIsTimerPaused(false);
  };

  const handleStop = () => {
    setIsTimerRunning(false);
    setIsTimerPaused(false);
    setElapsedSeconds(0);
  };

  const totalWeeklyHours = timeEntries
    .filter(e => e.status === 'completed')
    .reduce((sum, e) => {
      const parts = e.totalHours.split(':');
      return sum + parseInt(parts[0]) + parseInt(parts[1]) / 60;
    }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Working Hours</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your daily working hours and timesheet</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowTimesheet(false)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${!showTimesheet ? 'bg-red-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'}`}
          >
            Time Tracker
          </button>
          <button
            onClick={() => setShowTimesheet(true)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${showTimesheet ? 'bg-red-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'}`}
          >
            Timesheet
          </button>
        </div>
      </div>

      {!showTimesheet ? (
        <>
          {/* Timer Card */}
          <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium mb-6">
                <Timer className="w-4 h-4" />
                Today's Timer
              </div>

              <div className="text-7xl font-mono font-bold text-gray-900 dark:text-white mb-8 tracking-wider">
                {formatTime(elapsedSeconds)}
              </div>

              <div className="flex items-center justify-center gap-4">
                {!isTimerRunning ? (
                  <button
                    onClick={handleStart}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition shadow-lg shadow-green-600/25"
                  >
                    <Play className="w-5 h-5" />
                    Check In
                  </button>
                ) : (
                  <>
                    {isTimerPaused ? (
                      <button
                        onClick={handleResume}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition shadow-lg shadow-green-600/25"
                      >
                        <Play className="w-5 h-5" />
                        Resume
                      </button>
                    ) : (
                      <button
                        onClick={handlePause}
                        className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-xl transition shadow-lg shadow-yellow-600/25"
                      >
                        <Pause className="w-5 h-5" />
                        Pause
                      </button>
                    )}
                    <button
                      onClick={handleStop}
                      className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition shadow-lg shadow-red-600/25"
                    >
                      <Square className="w-5 h-5" />
                      Check Out
                    </button>
                  </>
                )}
              </div>

              {isTimerRunning && (
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {isTimerPaused ? 'Timer paused' : 'Timer running...'}
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-dark-800 rounded-lg p-5 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {isTimerRunning ? formatTime(elapsedSeconds) : '0:00:00'}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-800 rounded-lg p-5 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{totalWeeklyHours.toFixed(1)} hrs</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-800 rounded-lg p-5 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                  <Timer className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avg/Day</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {(totalWeeklyHours / timeEntries.filter(e => e.status === 'completed').length).toFixed(1)} hrs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Timesheet */}
          <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Weekly Timesheet</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Check Out</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Total Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                  {timeEntries.map(entry => (
                    <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{entry.date}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{entry.checkIn}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{entry.checkOut}</td>
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{entry.totalHours}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          entry.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                            : entry.status === 'in_progress'
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                            : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                        }`}>
                          {entry.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-900/30">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Weekly Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{totalWeeklyHours.toFixed(1)}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Hours</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">40</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Required Hours</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{(totalWeeklyHours - 40).toFixed(1)}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Overtime</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

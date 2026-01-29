import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LogOut, CheckCircle, Lock, Trophy } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth?mode=login');
      return;
    }
    
    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('sb-access-token');
    localStorage.removeItem('sb-refresh-token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const modules = [
    { name: 'Grip', icon: '🤝', completed: false },
    { name: 'Stance & Posture', icon: '🧍', completed: false },
    { name: 'Alignment', icon: '🎯', completed: false },
    { name: 'Backswing', icon: '↰', completed: false },
    { name: 'Downswing', icon: '↓', completed: false },
    { name: 'Impact', icon: '💥', completed: false },
    { name: 'Follow-through', icon: '↗', completed: false }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const completedCount = modules.filter(m => m.completed).length;
  const progressPercentage = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                ⛳
              </div>
              <span className="text-2xl font-bold text-gray-900">The Swing Blueprint</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'Golfer'}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Continue your journey to mastering the perfect golf swing
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-green-600">{progressPercentage}%</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="bg-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-gray-600">
            {completedCount} of {modules.length} modules completed
          </p>
        </div>

        {/* Modules Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl shadow-md p-6 transition cursor-pointer ${
                  module.completed 
                    ? 'border-2 border-green-500' 
                    : 'border-2 border-transparent hover:border-green-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{module.icon}</div>
                  {module.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Module {idx + 1}
                </h3>
                <p className="text-gray-600 font-medium mb-4">{module.name}</p>
                
                <button
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    module.completed
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {module.completed ? 'Review' : 'Start Module'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📹 Video Content Coming Soon!
          </h3>
          <p className="text-blue-700">
            Module videos and quizzes are currently being produced. Check back soon to start your learning journey!
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LogOut, CheckCircle, Lock, Trophy, Award, Target, Zap, Star, Medal } from 'lucide-react';

const SUPABASE_URL = 'https://lhqvtvxrbiydtcislfjm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocXZ0dnhyYml5ZHRjaXNsZmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDQxMTAsImV4cCI6MjA4MTQyMDExMH0.iseDg5x_UUZF4-gsvJMZ2YoXXdgGVV269oIkrmK6Pmw';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const modules = [
    { id: 1, name: 'Grip', icon: '🤝', completed: false },
    { id: 2, name: 'Stance & Posture', icon: '🧍', completed: false },
    { id: 3, name: 'Alignment', icon: '🎯', completed: false },
    { id: 4, name: 'Backswing', icon: '↰', completed: false },
    { id: 5, name: 'Downswing', icon: '↓', completed: false },
    { id: 6, name: 'Impact', icon: '💥', completed: false },
    { id: 7, name: 'Follow-through', icon: '↗', completed: false }
  ];

  // Define all possible achievements
  const allAchievements = [
    {
      id: 'first_module',
      title: 'First Steps',
      description: 'Complete your first module',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600',
      earned: false
    },
    {
      id: 'perfect_score',
      title: 'Perfect Score',
      description: 'Get 100% on a quiz first try',
      icon: <Star className="w-8 h-8" />,
      color: 'bg-yellow-100 text-yellow-600',
      earned: false
    },
    {
      id: 'three_modules',
      title: 'Getting Serious',
      description: 'Complete 3 modules',
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-purple-100 text-purple-600',
      earned: false
    },
    {
      id: 'halfway',
      title: 'Halfway There',
      description: 'Complete 4 modules (50%+)',
      icon: <Medal className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600',
      earned: false
    },
    {
      id: 'almost_done',
      title: 'Final Stretch',
      description: 'Complete 6 modules',
      icon: <Award className="w-8 h-8" />,
      color: 'bg-pink-100 text-pink-600',
      earned: false
    },
    {
      id: 'swing_master',
      title: 'Swing Master',
      description: 'Complete all 7 modules',
      icon: <Trophy className="w-8 h-8" />,
      color: 'bg-green-100 text-green-600',
      earned: false
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth?mode=login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchUserProgress(parsedUser.id);
  }, [router]);

  const fetchUserProgress = async (userId) => {
    const accessToken = localStorage.getItem('sb-access-token');
    
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/user_progress?user_id=eq.${userId}`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserProgress(data);
        calculateAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAchievements = (progressData) => {
    const completedCount = progressData.filter(p => p.completed).length;
    const earnedAchievements = [...allAchievements];

    // First module
    if (completedCount >= 1) {
      earnedAchievements[0].earned = true;
    }

    // Perfect score (check if any quiz has 100%)
    const hasPerfectScore = progressData.some(p => p.quiz_score === 100);
    if (hasPerfectScore) {
      earnedAchievements[1].earned = true;
    }

    // Three modules
    if (completedCount >= 3) {
      earnedAchievements[2].earned = true;
    }

    // Halfway (4 modules)
    if (completedCount >= 4) {
      earnedAchievements[3].earned = true;
    }

    // Almost done (6 modules)
    if (completedCount >= 6) {
      earnedAchievements[4].earned = true;
    }

    // Swing master (all 7)
    if (completedCount >= 7) {
      earnedAchievements[5].earned = true;
    }

    setAchievements(earnedAchievements);
  };

  const handleLogout = () => {
    localStorage.removeItem('sb-access-token');
    localStorage.removeItem('sb-refresh-token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleModuleClick = (moduleId) => {
    router.push(`/module/${moduleId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Update modules with completion status
  const updatedModules = modules.map(module => ({
    ...module,
    completed: userProgress.some(p => p.module_name === module.name && p.completed)
  }));

  const completedCount = updatedModules.filter(m => m.completed).length;
  const progressPercentage = Math.round((completedCount / modules.length) * 100);
  const earnedCount = achievements.filter(a => a.earned).length;

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

        {/* Achievements Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-purple-500" />
              <span className="text-lg font-semibold text-gray-700">
                {earnedCount} / {allAchievements.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-xl transition-all ${
                  achievement.earned
                    ? `${achievement.color} border-2 border-current`
                    : 'bg-gray-100 text-gray-400 opacity-50'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  {achievement.icon}
                  <h3 className="font-bold text-sm mt-2">{achievement.title}</h3>
                  <p className="text-xs mt-1">{achievement.description}</p>
                  {achievement.earned && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {earnedCount === 0 && (
            <div className="mt-6 text-center text-gray-500">
              Complete modules to unlock achievements! 🏆
            </div>
          )}
        </div>

        {/* Modules Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updatedModules.map((module, idx) => (
              <div
                key={idx}
                onClick={() => handleModuleClick(module.id)}
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

        {/* Motivational Message */}
        {completedCount > 0 && completedCount < 7 && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Keep Going! 💪</h3>
            <p className="text-lg">
              {completedCount === 6 
                ? "Just one more module to become a Swing Master!"
                : `${7 - completedCount} modules left to complete your journey!`}
            </p>
          </div>
        )}

        {completedCount === 7 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-white text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">Congratulations, Swing Master! 🎉</h3>
            <p className="text-xl">
              You've completed all modules and mastered the fundamentals of the golf swing!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

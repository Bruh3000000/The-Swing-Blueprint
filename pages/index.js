import React, { useState } from 'react';
import { Play, CheckCircle, Users, Award, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';

export default function LandingPage() {
  const router = useRouter();

  const modules = [
    { name: 'Grip', icon: '🤝' },
    { name: 'Stance & Posture', icon: '🧍' },
    { name: 'Alignment', icon: '🎯' },
    { name: 'Backswing', icon: '↰' },
    { name: 'Downswing', icon: '↓' },
    { name: 'Impact', icon: '💥' },
    { name: 'Follow-through', icon: '↗' }
  ];

  const features = [
    {
      icon: <Play className="w-6 h-6" />,
      title: 'Video Instruction',
      description: 'Learn from clear, detailed video lessons for each fundamental'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Knowledge Checks',
      description: 'Test your understanding with quizzes after each lesson'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Track Progress',
      description: 'Create an account and monitor your learning journey'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: '100% Free',
      description: 'Quality golf instruction accessible to everyone'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                ⛳
              </div>
              <span className="text-2xl font-bold text-gray-900">The Swing Blueprint</span>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => router.push('/auth?mode=login')}
                className="text-gray-700 hover:text-green-600 font-medium transition"
              >
                Login
              </button>
              <button 
                onClick={() => router.push('/auth?mode=signup')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master the Perfect Golf Swing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn the fundamentals of a solid golf swing with free video instruction, 
            interactive quizzes, and personalized progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => router.push('/auth?mode=signup')}
              className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg flex items-center space-x-2 shadow-lg"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg hover:bg-green-50 transition font-semibold text-lg">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 text-center">
          <div>
            <div className="text-4xl font-bold text-green-600">7</div>
            <div className="text-gray-600 mt-2">Core Modules</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">100%</div>
            <div className="text-gray-600 mt-2">Free Forever</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">∞</div>
            <div className="text-gray-600 mt-2">Practice Time</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-xl text-gray-600">
              A complete learning system designed for beginners
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-lg hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Overview */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Learning Path
            </h2>
            <p className="text-xl text-gray-600">
              Seven essential modules covering every aspect of the golf swing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {modules.map((module, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-green-500">
                <div className="text-4xl mb-3">{module.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Module {idx + 1}
                </h3>
                <p className="text-gray-600 font-medium">
                  {module.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Watch & Learn</h3>
              <p className="text-gray-600">
                Follow along with detailed video instruction for each swing fundamental
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Test Knowledge</h3>
              <p className="text-gray-600">
                Complete quizzes to ensure you understand the key concepts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your learning journey and build confidence on the course
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Improve Your Swing?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Join today and start learning the fundamentals of a great golf swing
          </p>
          <button 
            onClick={() => router.push('/auth?mode=signup')}
            className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition font-semibold text-lg shadow-lg"
          >
            Get Started Now - It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  ⛳
                </div>
                <span className="text-xl font-bold">The Swing Blueprint</span>
              </div>
              <p className="text-gray-400">
                Free golf instruction for everyone, helping beginners build a solid foundation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">All Modules</a></li>
                <li><a href="#" className="hover:text-white transition">Getting Started</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 The Swing Blueprint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

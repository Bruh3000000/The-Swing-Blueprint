import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, CheckCircle, XCircle, Play, Award } from 'lucide-react';

// Module data - you'll add your video URLs here once you upload them
const moduleData = {
  1: {
    title: "The Grip",
    icon: "🤝",
    description: "Learn the fundamental grip that provides control and consistency in your golf swing.",
    videoUrl: null, // You'll replace this with your video file path
    quizQuestions: [
      {
        question: "What are the three main types of golf grips?",
        options: [
          "Overlapping, Interlocking, and Baseball",
          "Strong, Neutral, and Weak",
          "Left-hand, Right-hand, and Two-handed",
          "Firm, Medium, and Loose"
        ],
        correctAnswer: 0
      },
      {
        question: "Where should your left thumb be positioned in a proper grip (for right-handed golfers)?",
        options: [
          "Directly on top of the grip",
          "Slightly to the right of center on the grip",
          "Wrapped completely around the grip",
          "Extended straight down the shaft"
        ],
        correctAnswer: 1
      },
      {
        question: "How tight should your grip pressure be on a scale of 1-10?",
        options: [
          "9-10 (Very tight)",
          "7-8 (Firm)",
          "4-6 (Medium firm)",
          "1-3 (Very light)"
        ],
        correctAnswer: 2
      },
      {
        question: "When looking down at your grip, how many knuckles should you see on your left hand for a neutral grip?",
        options: [
          "One knuckle",
          "Two to three knuckles",
          "Four knuckles",
          "No knuckles"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the primary benefit of maintaining a consistent grip?",
        options: [
          "It makes the club feel heavier",
          "It allows for maximum power on every shot",
          "It promotes consistent clubface control and shot direction",
          "It prevents blisters and calluses"
        ],
        correctAnswer: 2
      }
    ]
  },
  2: {
    title: "Stance & Posture",
    icon: "🧍",
    description: "Develop a solid foundation with proper stance and posture for a repeatable swing.",
    videoUrl: null,
    quizQuestions: [
      {
        question: "How wide should your stance be for a standard iron shot?",
        options: [
          "Feet together",
          "Shoulder-width apart",
          "Wider than shoulders",
          "As wide as possible"
        ],
        correctAnswer: 1
      },
      {
        question: "What should your spine angle look like at address?",
        options: [
          "Perfectly straight and vertical",
          "Tilted forward from the hips",
          "Leaning backward",
          "Curved in a C-shape"
        ],
        correctAnswer: 1
      },
      {
        question: "Where should your weight be distributed in your stance?",
        options: [
          "Entirely on your heels",
          "Entirely on your toes",
          "Evenly distributed on the balls of your feet",
          "On the outside edges of your feet"
        ],
        correctAnswer: 2
      },
      {
        question: "How much should your knees be flexed at address?",
        options: [
          "Locked straight",
          "Slightly flexed, like an athletic position",
          "Deeply bent in a squat",
          "One straight, one bent"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of proper posture in the golf swing?",
        options: [
          "To look professional",
          "To create the proper swing plane and maintain balance",
          "To intimidate your opponents",
          "To make the swing more difficult"
        ],
        correctAnswer: 1
      }
    ]
  },
  // Additional modules 3-7 would follow the same structure
};

export default function ModulePage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const module = moduleData[id];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth?mode=login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleVideoComplete = () => {
    setVideoWatched(true);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizComplete(false);
    setQuizPassed(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentQuestion < module.quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete - check if all answers are correct
      const allCorrect = newAnswers.every(
        (answer, idx) => answer === module.quizQuestions[idx].correctAnswer
      );
      setQuizComplete(true);
      setQuizPassed(allCorrect);
      
      if (allCorrect) {
        saveProgressToDatabase();
      }
    }
  };

  const saveProgressToDatabase = async () => {
    const accessToken = localStorage.getItem('sb-access-token');
    
    try {
      const response = await fetch(
        'https://lhqvtvxrbiydtcislfjm.supabase.co/rest/v1/user_progress',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocXZ0dnhyYml5ZHRjaXNsZmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDQxMTAsImV4cCI6MjA4MTQyMDExMH0.iseDg5x_UUZF4-gsvJMZ2YoXXdgGVV269oIkrmK6Pmw',
            'Authorization': `Bearer ${accessToken}`,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            user_id: user.id,
            module_name: module.title,
            completed: true,
            quiz_score: 100,
            completed_at: new Date().toISOString()
          })
        }
      );

      if (response.ok) {
        console.log('Progress saved successfully');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const retryQuiz = () => {
    setShowQuiz(false);
    setQuizComplete(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const returnToDashboard = () => {
    router.push('/dashboard');
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Module not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={returnToDashboard}
              className="flex items-center text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Module Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{module.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Module {id}: {module.title}
          </h1>
          <p className="text-xl text-gray-600">{module.description}</p>
        </div>

        {/* Video Section */}
        {!showQuiz && !quizComplete && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructional Video</h2>
            
            {module.videoUrl ? (
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mb-6">
                <video
                  controls
                  className="w-full h-full"
                  onEnded={handleVideoComplete}
                >
                  <source src={module.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">Video coming soon!</p>
                  <p className="text-gray-500 text-sm mt-2">
                    For now, you can proceed to the quiz to test the system
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={startQuiz}
              disabled={!videoWatched && module.videoUrl}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
                videoWatched || !module.videoUrl
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {videoWatched || !module.videoUrl ? 'Start Quiz' : 'Watch video to unlock quiz'}
            </button>
          </div>
        )}

        {/* Quiz Section */}
        {showQuiz && !quizComplete && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Knowledge Check</h2>
                <span className="text-gray-600 font-semibold">
                  Question {currentQuestion + 1} of {module.quizQuestions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${((currentQuestion + 1) / module.quizQuestions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {module.quizQuestions[currentQuestion].question}
              </h3>

              <div className="space-y-4">
                {module.quizQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      selectedAnswer === idx
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          selectedAnswer === idx
                            ? 'border-green-600 bg-green-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedAnswer === idx && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
                selectedAnswer !== null
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion < module.quizQuestions.length - 1 ? 'Next Question' : 'Submit Quiz'}
            </button>
          </div>
        )}

        {/* Quiz Results */}
        {quizComplete && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            {quizPassed ? (
              <>
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-16 h-16 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Congratulations! 🎉
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  You've successfully completed Module {id}: {module.title}
                </p>
                <button
                  onClick={returnToDashboard}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
                >
                  Return to Dashboard
                </button>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-16 h-16 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Not Quite There Yet
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  You need to get all questions correct to pass. Review the video and try again!
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={retryQuiz}
                    className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
                  >
                    Retry Quiz
                  </button>
                  <button
                    onClick={returnToDashboard}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition font-semibold text-lg"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

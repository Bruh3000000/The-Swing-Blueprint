import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, CheckCircle, XCircle, Play, Award } from 'lucide-react';

// Module data - Videos now added!
const moduleData = {
  1: {
    title: "The Grip",
    icon: "🤝",
    description: "Learn the fundamental grip that provides control and consistency in your golf swing.",
    videoUrl: "https://www.youtube.com/embed/yTiGXYZYvOA",
    quizQuestions: [
      {
        question: "What are the three main types of golf grips?",
        options: [
          "Strong, Neutral, and Weak",
          "Interlock, Overlap, and Ten Finger",
          "Palm, Finger, and Baseball",
          "Left-hand, Right-hand, and Two-handed"
        ],
        correctAnswer: 1
      },
      {
        question: "For a right-handed golfer, where should the club sit in your left hand?",
        options: [
          "Deep in the palm",
          "In the fingertips only",
          "Right where your knuckles are",
          "Between the thumb and index finger"
        ],
        correctAnswer: 2
      },
      {
        question: "What happens if the club sits too much in your fingers (too strong a grip)?",
        options: [
          "The ball will go way right",
          "The ball will go left",
          "You'll have no control",
          "The club will slip"
        ],
        correctAnswer: 1
      },
      {
        question: "In an interlock grip, where does the right hand pinky go?",
        options: [
          "On top of the left pinky",
          "Underneath the left pinky",
          "Between the left index and middle finger",
          "Separate from the left hand"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the correct grip pressure you should use?",
        options: [
          "Grip as hard as possible for maximum control",
          "Grip very softly to maintain flexibility",
          "A nice medium grip strength",
          "It doesn't matter, any pressure works"
        ],
        correctAnswer: 2
      }
    ]
  },
  2: {
    title: "Stance & Posture",
    icon: "🧍",
    description: "Develop a solid foundation with proper stance and posture for a repeatable swing.",
    videoUrl: "https://www.youtube.com/embed/ORLhqPy4lmA",
    quizQuestions: [
      {
        question: "How wide should your stance be when hitting a 7 iron?",
        options: [
          "Feet together",
          "Shoulder width apart",
          "Wider than shoulder width",
          "As wide as possible"
        ],
        correctAnswer: 1
      },
      {
        question: "What angle should your back be bent at during setup?",
        options: [
          "20-25 degrees",
          "35-40 degrees",
          "50-60 degrees",
          "Completely straight"
        ],
        correctAnswer: 1
      },
      {
        question: "How should your arms hang at address?",
        options: [
          "Reaching far out from your body",
          "Tucked close to your chest",
          "Pretty much straight down to the ground",
          "Bent at 90 degrees"
        ],
        correctAnswer: 2
      },
      {
        question: "Why do you need bend in your knees at address?",
        options: [
          "To look athletic",
          "To allow you to get power from your lower body",
          "To prevent back pain",
          "To see the ball better"
        ],
        correctAnswer: 1
      },
      {
        question: "What's different about the driver setup compared to an iron?",
        options: [
          "Feet are closer together",
          "Feet are a little farther than shoulder width, with a slight shoulder tilt",
          "Back is completely straight",
          "Knees are locked"
        ],
        correctAnswer: 1
      }
    ]
  },
  3: {
    title: "Alignment",
    icon: "🎯",
    description: "Master proper alignment to ensure you're aimed at your target.",
    videoUrl: "https://www.youtube.com/embed/-Jy8bcPGEhU",
    quizQuestions: [
      {
        question: "What is the target line in golf?",
        options: [
          "The line from the ball to where you're standing",
          "The imaginary line from the ball to your target",
          "The line your feet make at address",
          "The line parallel to your shoulders"
        ],
        correctAnswer: 1
      },
      {
        question: "How should your feet be aligned relative to the target line?",
        options: [
          "Directly at the target",
          "Parallel to the target line (slightly left for right-handed golfers)",
          "Perpendicular to the target line",
          "At a 45-degree angle to the target"
        ],
        correctAnswer: 1
      },
      {
        question: "What should be aligned parallel to each other at address?",
        options: [
          "Feet, knees, hips, and shoulders",
          "Only feet and shoulders",
          "Hands and clubface",
          "Ball position and target"
        ],
        correctAnswer: 0
      },
      {
        question: "Where should the clubface be aimed at address?",
        options: [
          "Slightly left of target",
          "Directly at your feet",
          "Directly at the target",
          "Slightly right of target"
        ],
        correctAnswer: 2
      },
      {
        question: "Why is proper alignment crucial in golf?",
        options: [
          "It makes you look professional",
          "It ensures you're aimed at your target and promotes consistent ball flight",
          "It helps you swing harder",
          "It prevents injuries"
        ],
        correctAnswer: 1
      }
    ]
  },
  4: {
    title: "Backswing",
    icon: "↰",
    description: "Learn the proper backswing mechanics to create power and consistency.",
    videoUrl: "https://www.youtube.com/embed/aF8LUS4MKWY",
    quizQuestions: [
      {
        question: "What initiates the backswing?",
        options: [
          "The hands moving first",
          "The shoulders rotating",
          "A unified turn of the shoulders, arms, and club together (the takeaway)",
          "Lifting the club straight up"
        ],
        correctAnswer: 2
      },
      {
        question: "At the top of the backswing, where should your weight be distributed?",
        options: [
          "Evenly on both feet",
          "Primarily on your front foot",
          "Primarily on your back foot (right foot for right-handed golfers)",
          "Entirely on your toes"
        ],
        correctAnswer: 2
      },
      {
        question: "What should your lead arm (left arm for right-handed golfers) look like at the top of the backswing?",
        options: [
          "Bent at 90 degrees",
          "Relatively straight and extended",
          "Completely relaxed and loose",
          "Tucked close to your body"
        ],
        correctAnswer: 1
      },
      {
        question: "How far should your shoulders rotate during the backswing?",
        options: [
          "About 90 degrees",
          "About 45 degrees",
          "About 180 degrees",
          "No rotation needed"
        ],
        correctAnswer: 0
      },
      {
        question: "What is the purpose of the backswing?",
        options: [
          "To show off your flexibility",
          "To create potential energy and set the club in proper position for the downswing",
          "To confuse your opponents",
          "To rest before hitting the ball"
        ],
        correctAnswer: 1
      }
    ]
  },
  5: {
    title: "Downswing",
    icon: "↓",
    description: "Master the downswing sequence to maximize power and accuracy.",
    videoUrl: "https://www.youtube.com/embed/wSrMx9NaSD8",
    quizQuestions: [
      {
        question: "What initiates the downswing?",
        options: [
          "The arms pulling down",
          "The lower body (hips) starting to rotate toward the target",
          "The shoulders turning",
          "The wrists unhinging immediately"
        ],
        correctAnswer: 1
      },
      {
        question: "During the downswing, how should your weight shift?",
        options: [
          "Stay on your back foot",
          "Transfer from your back foot to your front foot",
          "Jump off both feet",
          "Shift to your heels"
        ],
        correctAnswer: 1
      },
      {
        question: "What is 'lag' in the golf swing?",
        options: [
          "When you're slow to start your swing",
          "The angle maintained between the club shaft and your lead arm during the downswing",
          "Waiting too long to hit the ball",
          "The delay in your follow-through"
        ],
        correctAnswer: 1
      },
      {
        question: "What should your hips be doing during the downswing?",
        options: [
          "Staying completely still",
          "Rotating toward the target (clearing)",
          "Sliding laterally without rotation",
          "Moving backward away from the ball"
        ],
        correctAnswer: 1
      },
      {
        question: "Why is the downswing sequence (lower body first, then upper body) important?",
        options: [
          "It looks more professional",
          "It generates maximum power and ensures solid contact",
          "It's easier on your back",
          "It makes the swing slower"
        ],
        correctAnswer: 1
      }
    ]
  },
  6: {
    title: "Impact",
    icon: "💥",
    description: "Perfect your impact position for solid, consistent ball striking.",
    videoUrl: "https://www.youtube.com/embed/0VdVCjBrPQo",
    quizQuestions: [
      {
        question: "At impact, where should your weight be distributed?",
        options: [
          "Evenly on both feet",
          "Primarily on your back foot",
          "Primarily on your front foot (about 70-80%)",
          "Completely off the ground"
        ],
        correctAnswer: 2
      },
      {
        question: "What should the clubface position be at impact?",
        options: [
          "Open (facing right for right-handed golfers)",
          "Closed (facing left for right-handed golfers)",
          "Square to the target line",
          "Perpendicular to the ground"
        ],
        correctAnswer: 2
      },
      {
        question: "Where should your hands be at impact relative to the ball?",
        options: [
          "Behind the ball",
          "Directly above the ball",
          "Slightly ahead of the ball",
          "At your back hip"
        ],
        correctAnswer: 2
      },
      {
        question: "What should happen to the divot (if taking one) with an iron shot?",
        options: [
          "It should be taken before the ball",
          "It should be taken after the ball (ball first, then ground)",
          "No divot should be taken",
          "It should be as deep as possible"
        ],
        correctAnswer: 1
      },
      {
        question: "Why is impact position the most critical moment in the golf swing?",
        options: [
          "It's when the photo is taken",
          "It's where the club actually contacts the ball and determines ball flight",
          "It's the easiest part of the swing",
          "It's when you can relax"
        ],
        correctAnswer: 1
      }
    ]
  },
  7: {
    title: "Follow-through",
    icon: "↗",
    description: "Complete your swing with a balanced, full follow-through.",
    videoUrl: "https://www.youtube.com/embed/Oxnbghh6sw4",
    quizQuestions: [
      {
        question: "After impact, where should most of your weight end up?",
        options: [
          "On your back foot",
          "Evenly distributed",
          "Almost entirely on your front foot",
          "Off the ground"
        ],
        correctAnswer: 2
      },
      {
        question: "What should your body position look like at the finish?",
        options: [
          "Bent forward at the waist",
          "Balanced with chest facing the target and back heel off the ground",
          "Leaning backward",
          "Twisted uncomfortably"
        ],
        correctAnswer: 1
      },
      {
        question: "How high should your hands finish in a full swing?",
        options: [
          "At waist height",
          "At shoulder height",
          "Above your head in a high finish",
          "Down by your legs"
        ],
        correctAnswer: 2
      },
      {
        question: "What does a balanced finish position indicate?",
        options: [
          "You swung too slowly",
          "You maintained good tempo and mechanics throughout the swing",
          "You're trying too hard",
          "Nothing important"
        ],
        correctAnswer: 1
      },
      {
        question: "Why is the follow-through important if the ball has already been hit?",
        options: [
          "It's not important, it's just for show",
          "It ensures you completed the swing with proper tempo and didn't decelerate at impact",
          "It impresses your playing partners",
          "It helps you find your ball"
        ],
        correctAnswer: 1
      }
    ]
  }
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
              <>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mb-6">
                  <iframe
                    className="w-full h-full"
                    src={module.videoUrl}
                    title={`${module.title} Instructional Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                {!videoWatched && (
                  <button
                    onClick={handleVideoComplete}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mb-6"
                  >
                    ✓ Mark Video as Watched
                  </button>
                )}
                {videoWatched && (
                  <div className="w-full bg-green-100 text-green-700 py-3 rounded-lg font-semibold text-center mb-6 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Video Watched - Quiz Unlocked!
                  </div>
                )}
              </>
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
              {videoWatched || !module.videoUrl ? '🎯 Start Quiz' : 'Watch video and click the button above to unlock'}
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

import React, { useState, useEffect } from 'react';
import { Award, Leaf, TrendingUp, BadgeCheck, Target, ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  unit: string;
  unlocked: boolean;
}

const GreenScore: React.FC = () => {
  const { wallet } = useAuth();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Carbon Pioneer',
      description: 'Offset your first 100 tons of CO2',
      progress: 75,
      target: 100,
      unit: 'tons',
      unlocked: false
    },
    {
      id: '2',
      title: 'Green Innovator',
      description: 'Complete 5 sustainability projects',
      progress: 3,
      target: 5,
      unit: 'projects',
      unlocked: false
    },
    {
      id: '3',
      title: 'Supply Chain Master',
      description: 'Achieve 30% emissions reduction in supply chain',
      progress: 25,
      target: 30,
      unit: '%',
      unlocked: false
    }
  ]);

  useEffect(() => {
    // Simulate score calculation based on user's transactions and carbon credits
    const calculateScore = () => {
      const baseScore = Math.floor(Math.random() * 500) + 500;
      setScore(baseScore);
      setLevel(Math.floor(baseScore / 100));
    };

    if (wallet) {
      calculateScore();
    }
  }, [wallet]);

  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 600) return 'text-blue-600 dark:text-blue-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  const getLevelTitle = (level: number) => {
    if (level >= 8) return 'Sustainability Leader';
    if (level >= 6) return 'Green Expert';
    if (level >= 4) return 'Eco-Innovator';
    return 'Green Starter';
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 80) return 'bg-emerald-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Green Score</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your sustainability performance and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Overview */}
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Award className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {score}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Green Score
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                Level {level}
              </div>
              <div className={`text-sm ${getScoreColor(score)}`}>
                {getLevelTitle(level)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Progress to Next Level</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {score % 100}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${score % 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                    <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                      Carbon Offset
                    </span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    75%
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Efficiency
                    </span>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    82%
                  </span>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BadgeCheck className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                      Compliance
                    </span>
                  </div>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    95%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Carbon Credits Purchased
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                +25 points
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Sustainability Goal Met
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 day ago
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                +50 points
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <div className="mt-6">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Achievements
            </h3>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center hover:underline">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </h4>
                  {achievement.unlocked && (
                    <BadgeCheck className="h-5 w-5 text-emerald-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {achievement.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {achievement.progress}/{achievement.target} {achievement.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${getProgressColor(achievement.progress, achievement.target)} h-2 rounded-full transition-all`}
                      style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GreenScore;
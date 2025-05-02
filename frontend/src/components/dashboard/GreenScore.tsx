import React, { useState, useEffect } from 'react';
import { Award, Leaf, Zap, Droplet, Trash2, BadgeCheck, Trees } from 'lucide-react';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { useEnvironmentalData } from '../../context/EnvironmentalContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  unit: string;
  unlocked: boolean;
  icon: React.ReactNode;
}

const GreenScore: React.FC = () => {
  const { wallet } = useAuth();
  const { impactData } = useEnvironmentalData();
  const [score, setScore] = useState(500); // Start at midpoint
  const [level, setLevel] = useState(5);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [metrics, setMetrics] = useState({
    carbonEfficiency: 50,
    energyEfficiency: 50,
    waterEfficiency: 50,
    wasteEfficiency: 50
  });

  useEffect(() => {
    const calculateScore = () => {
      if (!impactData || impactData.length < 2) return;
    
      const latest = impactData[impactData.length - 1];
      const previous = impactData[impactData.length - 2]; // Now used in calculations
      const avgData = impactData.reduce((acc, curr) => ({
        carbon: acc.carbon + curr.carbon,
        energy: acc.energy + curr.energy,
        water: acc.water + curr.water,
        waste: acc.waste + curr.waste
      }), { carbon: 0, energy: 0, water: 0, waste: 0 });
    
      // Calculate averages with minimum value of 1 to prevent division by zero
      const avgCarbon = Math.max(1, avgData.carbon / impactData.length);
      const avgEnergy = Math.max(1, avgData.energy / impactData.length);
      const avgWater = Math.max(1, avgData.water / impactData.length);
      const avgWaste = Math.max(1, avgData.waste / impactData.length);
    
      // Calculate efficiency percentages (0-100)
      const carbonEff = Math.max(0, Math.min(100, 
        (1 - latest.carbon / avgCarbon) * 100
      ));
      const energyEff = Math.max(0, Math.min(100,
        (1 - latest.energy / avgEnergy) * 100
      ));
      const waterEff = Math.max(0, Math.min(100,
        (1 - latest.water / avgWater) * 100
      ));
      const wasteEff = Math.max(0, Math.min(100,
        (1 - latest.waste / avgWaste) * 100
      ));

      setMetrics({
        carbonEfficiency: carbonEff,
        energyEfficiency: energyEff,
        waterEfficiency: waterEff,
        wasteEfficiency: wasteEff
      });

      // Calculate composite score (0-1000)
      const totalScore = Math.min(1000, Math.round(
        (carbonEff * 4) + // 40% weight
        (energyEff * 2) + // 20% weight
        (waterEff * 2) +  // 20% weight
        (wasteEff * 2)    // 20% weight
      ));

      setScore(totalScore);
      setLevel(Math.min(10, Math.floor(totalScore / 100)));

      // Update achievements
      setAchievements([
        {
          id: 'carbon',
          title: 'Carbon Leader',
          description: 'Maintain low emissions',
          progress: carbonEff,
          target: 80,
          unit: '% efficiency',
          unlocked: carbonEff >= 80,
          icon: <Leaf className="h-5 w-5 text-emerald-500" />
        },
        {
          id: 'energy',
          title: 'Energy Saver',
          description: 'Reduce energy usage',
          progress: energyEff,
          target: 75,
          unit: '% efficiency',
          unlocked: energyEff >= 75,
          icon: <Zap className="h-5 w-5 text-yellow-500" />
        },
        {
          id: 'water',
          title: 'Water Guardian',
          description: 'Conserve water',
          progress: waterEff,
          target: 70,
          unit: '% efficiency',
          unlocked: waterEff >= 70,
          icon: <Droplet className="h-5 w-5 text-blue-500" />
        },
        {
          id: 'waste',
          title: 'Waste Reducer',
          description: 'Minimize waste',
          progress: wasteEff,
          target: 65,
          unit: '% efficiency',
          unlocked: wasteEff >= 65,
          icon: <Trash2 className="h-5 w-5 text-green-500" />
        }
      ]);
    };

    calculateScore();
  }, [impactData, wallet]);

  const getScoreColor = () => {
    if (score >= 800) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 600) return 'text-blue-600 dark:text-blue-400';
    if (score >= 400) return 'text-amber-600 dark:text-amber-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getLevelTitle = () => {
    if (level >= 8) return 'Sustainability Leader';
    if (level >= 6) return 'Green Expert';
    if (level >= 4) return 'Eco-Innovator';
    return 'Newcomer';
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return 'bg-emerald-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-amber-500';
    return 'bg-gray-300';
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sustainability Score</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Measures your environmental performance against historical averages
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
                <h2 className={`text-2xl font-bold ${getScoreColor()}`}>
                  {score}
                  <span className="text-sm font-normal text-gray-500 ml-1">/1000</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Overall Sustainability Score
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                Level {level}
              </div>
              <div className={`text-sm ${getScoreColor()}`}>
                {getLevelTitle()}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Progress to Next Level</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {score % 100}/100 points
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`${getProgressColor(score % 100, 100)} h-2 rounded-full transition-all`}
                  style={{ width: `${score % 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Efficiency Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="flex items-center">
                <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  Carbon Efficiency
                </span>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {metrics.carbonEfficiency.toFixed(0)}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                <span className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  Energy Efficiency
                </span>
              </div>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                {metrics.energyEfficiency.toFixed(0)}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center">
                <Droplet className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Water Efficiency
                </span>
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {metrics.waterEfficiency.toFixed(0)}%
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
              Sustainability Achievements
            </h3>
            <div className="text-sm text-gray-500">
              {achievements.filter(a => a.unlocked).length}/{achievements.length} unlocked
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all ${
                  achievement.unlocked
                    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    {achievement.icon}
                    <h4 className="ml-2 font-medium text-gray-900 dark:text-white">
                      {achievement.title}
                    </h4>
                  </div>
                  {achievement.unlocked ? (
                    <BadgeCheck className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <div className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {achievement.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {achievement.progress.toFixed(0)}/{achievement.target}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${getProgressColor(achievement.progress, achievement.target)} h-2 rounded-full`}
                      style={{ 
                        width: `${Math.min(100, (achievement.progress / achievement.target) * 100)}%` 
                      }}
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
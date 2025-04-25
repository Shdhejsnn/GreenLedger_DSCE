import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface OffsetSource {
  type: string;
  amount: number;
  unit: string;
}

interface SourceType {
  value: string;
  label: string;
  unit: string;
  icon: () => React.ReactNode;
}

const CarbonCalculator: React.FC = () => {
  const [sources, setSources] = useState<OffsetSource[]>([]);
  const [currentSource, setCurrentSource] = useState<OffsetSource>({
    type: 'transportation',
    amount: 0,
    unit: 'km',
  });
  const [totalOffset, setTotalOffset] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const sourceTypes: SourceType[] = [
    { value: 'transportation', label: 'Transportation', unit: 'km', icon: () => <ArrowRight /> },
    { value: 'electricity', label: 'Electricity Usage', unit: 'kWh', icon: () => <ArrowRight /> },
    { value: 'flights', label: 'Air Travel', unit: 'km', icon: () => <ArrowRight /> },
    { value: 'purchases', label: 'Product Purchases', unit: 'items', icon: () => <ArrowRight /> },
    { value: 'industrial', label: 'Industrial Processes', unit: 'kg', icon: () => <ArrowRight /> },
  ];

  const offsetFactors: Record<string, number> = {
    transportation: 0.1,
    electricity: 0.4,
    flights: 0.3,
    purchases: 8,
    industrial: 2,
  };

  const handleAddSource = () => {
    const offset = currentSource.amount * offsetFactors[currentSource.type];
    setSources([...sources, currentSource]);
    setTotalOffset(totalOffset + offset);

    const newRecommendations = [];
    switch (currentSource.type) {
      case 'transportation':
        newRecommendations.push('Consider carbon offset programs for your travel');
        break;
      case 'electricity':
        newRecommendations.push('Switch to renewable energy sources');
        break;
      case 'flights':
        newRecommendations.push('Consider using carbon offset programs for flights');
        break;
      case 'purchases':
        newRecommendations.push('Choose low-carbon products');
        break;
      case 'industrial':
        newRecommendations.push('Implement energy-efficient technologies in production');
        break;
    }

    setRecommendations([...new Set([...recommendations, ...newRecommendations])]);

    setCurrentSource({
      type: 'transportation',
      amount: 0,
      unit: 'km',
    });
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Carbon Offset Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate your carbon offset and get personalized recommendations to reduce your carbon footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Offset Calculator Form */}
        <Card className="shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add Offset Source
          </h3>

          <div className="space-y-4">
            <Select
              label="Source Type"
              options={sourceTypes.map((type) => ({
                value: type.value,
                label: type.label,
              }))}
              value={currentSource.type}
              onChange={(e) => {
                const selected = sourceTypes.find((type) => type.value === e.target.value);
                setCurrentSource({
                  ...currentSource,
                  type: e.target.value,
                  unit: selected ? selected.unit : 'km',
                });
              }}
              fullWidth
              className="border-gray-300"
            />

            <Input
              type="number"
              label="Amount"
              value={currentSource.amount}
              onChange={(e) =>
                setCurrentSource({
                  ...currentSource,
                  amount: parseFloat(e.target.value),
                })
              }
              placeholder={`Enter amount in ${currentSource.unit}`}
              fullWidth
              className="border-gray-300"
            />

            <Button
              onClick={handleAddSource}
              fullWidth
              disabled={currentSource.amount <= 0}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Source
            </Button>
          </div>
        </Card>

        {/* Results Card */}
        <Card className="shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Offset Summary
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="text-sm text-emerald-600 dark:text-emerald-400">Total Offset</div>
              <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                {totalOffset.toFixed(2)} kg CO2e
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-sm text-yellow-600 dark:text-yellow-400">Required Carbon Credits</div>
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                {(totalOffset / 1000).toFixed(2)} Carbon Credits
              </div>
            </div>

            {sources.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Offset Sources
                </div>
                {sources.map((source, index) => {
                  const sourceType = sourceTypes.find((type) => type.value === source.type);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
                    >
                      <div className="flex items-center">
                        {sourceType && (
                          <span className="mr-2">
                            {sourceType.icon()}
                          </span>
                        )}
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {sourceType?.label}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {source.amount} {source.unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="mt-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Reduction Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              >
                <ArrowRight className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" />
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  {recommendation}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CarbonCalculator;

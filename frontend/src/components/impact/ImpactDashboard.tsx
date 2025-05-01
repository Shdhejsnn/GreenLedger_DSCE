import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Leaf, Droplets, Wind, Sun, Trash2, TreePine } from 'lucide-react';
import Card from '../ui/Card';
import { useEnvironmentalData } from '../../context/EnvironmentalContext';

const ImpactDashboard: React.FC = () => {
  const { impactData } = useEnvironmentalData();

  const calculateChange = (metric: keyof typeof impactData[0]) => {
    if (impactData.length < 2) return '0.0';
    const current = impactData[impactData.length - 1][metric] as number;
    const previous = impactData[impactData.length - 2][metric] as number;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getMetricColor = (change: string) => {
    return parseFloat(change) <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';
  };

  if (impactData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const latestData = impactData[impactData.length - 1];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Environmental Impact Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time monitoring of your organization's environmental impact
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Carbon Emissions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Carbon Emissions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly tracking</p>
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {latestData.carbon} tons
          </div>
          <div className={`text-sm ${getMetricColor(calculateChange('carbon'))}`}>
            {calculateChange('carbon')}% vs last month
          </div>
        </Card>

        {/* Water Usage */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Water Usage</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly tracking</p>
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {latestData.water} m³
          </div>
          <div className={`text-sm ${getMetricColor(calculateChange('water'))}`}>
            {calculateChange('water')}% vs last month
          </div>
        </Card>

        {/* Energy Consumption */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Sun className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Energy Usage</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly tracking</p>
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {latestData.energy} kWh
          </div>
          <div className={`text-sm ${getMetricColor(calculateChange('energy'))}`}>
            {calculateChange('energy')}% vs last month
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Emissions Trend */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Carbon Emissions Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="carbon" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.1} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Resource Usage Comparison */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resource Usage</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactData.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="water" fill="#3b82f6" name="Water (m³)" />
                <Bar dataKey="energy" fill="#eab308" name="Energy (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Waste Management */}
        <Card>
          <div className="flex items-center mb-4">
            <Trash2 className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Waste Management</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Recycled</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">75%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Composted</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">15%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Landfill</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">10%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </Card>

        {/* Renewable Energy Mix */}
        <Card>
          <div className="flex items-center mb-4">
            <Wind className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Energy Sources</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Solar</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">40%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Wind</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">35%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Grid</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">25%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </Card>

        {/* Carbon Offset Progress */}
        <Card>
          <div className="flex items-center mb-4">
            <TreePine className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Carbon Offset</h3>
          </div>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {latestData.trees}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Trees Planted This Month
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">CO₂ Absorbed</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {latestData.trees * 48} kg/year
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Area Covered</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {(latestData.trees * 100).toLocaleString()} sq ft
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImpactDashboard;
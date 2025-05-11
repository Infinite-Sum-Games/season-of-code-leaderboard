'use client';
import type { ChartConfig } from '@/app/components/ui/chart';
import { useEffect, useState } from 'react';
import {
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { BackgroundGradient } from '../ui/background-gradient';
import { Card } from '../ui/card';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/components/ui/chart';

export interface GraphData {
  // Pie chart data
  prStats: {
    opened: number;
    merged: number;
    issuesSolved: number;
  };

  // Radar chart data
  contributionStats: {
    codeContribution: number;
    testing: number;
    bugFixes: number;
    documentation: number;
    features: number;
    uiux: number;
  };
}
const LoadingGraphs = () => (
  <div className="w-full flex items-center justify-center p-6">
    <div className="w-full max-w-5xl">
      <BackgroundGradient className="p-4 rounded-xl">
        <Card className="bg-[#050217] border border-gray-700 p-8 rounded-xl shadow-lg">
          <div className="text-center text-gray-300">
            <h2 className="text-3xl text-[#c8c7cc] font-semibold">
              Loading contribution data...
            </h2>
            <p className="mt-2 text-lg">Your stats will appear shortly 📊</p>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  </div>
);

const ErrorGraphs = () => (
  <div className="w-full flex justify-center px-4 py-8">
    <div className="w-full max-w-5xl">
      <BackgroundGradient className="p-4 rounded-xl">
        <Card className="bg-[#050217] border border-gray-700 p-8 rounded-xl shadow-lg transition-transform transform">
          <div className="text-center text-gray-300">
            <h2 className="text-3xl text-[#c8c7cc] font-semibold">
              Could not load contribution charts
            </h2>
            <p className="mt-2 text-lg">Please try refreshing the page 🔄</p>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  </div>
);

// Chart configurations
const pieChartConfig = {
  opened: {
    label: 'PRs Opened',
  },
  merged: {
    label: 'PRs Merged',
  },
  solved: {
    label: 'Issues Solved',
  },
} satisfies ChartConfig;

const radarChartConfig = {
  code: {
    label: 'Code Contribution',
  },
} satisfies ChartConfig;

const GraphSection = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    // Add resize event listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    // Simulating API fetch with dummy data
    const dummyData: GraphData = {
      prStats: {
        opened: 15,
        merged: 12,
        issuesSolved: 8,
      },
      contributionStats: {
        codeContribution: 80,
        testing: 65,
        bugFixes: 75,
        documentation: 50,
        features: 60,
        uiux: 70,
      },
    };

    const timeout = setTimeout(() => {
      try {
        setGraphData(dummyData);
        setLoading(false);
        console.log('Loaded graph data:', dummyData);
      } catch (err) {
        console.error('Error loading graph data:', err);
        setError(true);
        setLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <LoadingGraphs />;
  if (error || !graphData) return <ErrorGraphs />;

  // Format data for pie chart
  const pieData = [
    { name: 'PRs Opened', value: graphData.prStats.opened, fill: '#f0b073' },
    { name: 'PRs Merged', value: graphData.prStats.merged, fill: '#eeea97' },
    {
      name: 'Issues Solved',
      value: graphData.prStats.issuesSolved,
      fill: '#9cd0e4',
    },
  ];

  // Format data for radar chart
  const radarData = [
    {
      attribute: 'Code Contribution',
      value: graphData.contributionStats.codeContribution,
    },
    { attribute: 'Testing', value: graphData.contributionStats.testing },
    { attribute: 'Bugs Fixes', value: graphData.contributionStats.bugFixes },
    {
      attribute: 'Documentation',
      value: graphData.contributionStats.documentation,
    },
    { attribute: 'Features', value: graphData.contributionStats.features },
    { attribute: 'UI/UX', value: graphData.contributionStats.uiux },
  ];

  // Determine radar chart label font size based on screen width
  const radarLabelFontSize =
    windowWidth < 640 ? 9 : windowWidth < 768 ? 12 : 16;

  // Determine outer radius for radar chart based on screen width
  const radarOuterRadius =
    windowWidth < 640 ? 70 : windowWidth < 768 ? 85 : 100;

  // Determine cy value for radar chart based on screen width
  const radarCy = windowWidth < 640 ? 105 : windowWidth < 768 ? 120 : 135;

  // Determine pie chart outer radius based on screen width
  const pieOuterRadius = windowWidth < 640 ? 70 : windowWidth < 768 ? 85 : 100;

  return (
    <div
      className="relative w-full bg-transparent backdrop-blur-2xl shadow-lg rounded-xl p-4 sm:p-6 mt-8"
      style={{ width: '95%' }}
    >
      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-gray-900 mb-4 sm:mb-6 text-center">
        Contribution Analytics
      </h2>

      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 items-stretch">
        {/* Pie Chart */}
        <div className="flex-1 min-w-0 bg-sky-100 bg-opacity-60 border border-yellow-800 rounded-xl shadow-xl p-3 sm:p-4 transform transition-all duration-300 hover:scale-102 hover:border-gray-500">
          <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-center text-gray-900">
            Contribution Chart
          </h3>
          <div className="h-[200px] sm:h-[220px] md:h-[250px] w-full">
            <ChartContainer
              config={pieChartConfig}
              className="mx-auto h-full w-full"
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={pieOuterRadius}
                    label={false}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mt-2">
            {pieData.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center gap-1 sm:gap-2"
              >
                <div
                  className="w-2 sm:w-3 h-2 sm:h-3 rounded-full"
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="text-xs sm:text-sm text-gray-900 font-bold">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="flex-1 min-w-0 bg-sky-100 bg-opacity-60 border border-yellow-800 rounded-xl shadow-xl p-3 sm:p-4 transform transition-all duration-300 hover:scale-102 hover:border-gray-500">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 text-center">
            Issue Distribution
          </h3>
          <div className="h-[225px] sm:h-[250px] md:h-[275px] w-full">
            <ChartContainer
              config={radarChartConfig}
              className="mx-auto h-full w-full"
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <RadarChart
                  outerRadius={radarOuterRadius}
                  cy={radarCy}
                  data={radarData}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <PolarGrid stroke="#f28b30" />
                  <PolarAngleAxis
                    dataKey="attribute"
                    tick={{
                      fill: '#1b497d',
                      fontSize: radarLabelFontSize,
                      dy: windowWidth < 640 ? 1 : 3,
                    }}
                    tickLine={false}
                    tickSize={windowWidth < 640 ? 10 : 15}
                  />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#f28b30"
                    fill="hsl(35,100%,57%)"
                    fillOpacity={0.6}
                    dot={{
                      r: windowWidth < 640 ? 2 : windowWidth < 768 ? 3 : 4,
                      fill: '#f28b30',
                      fillOpacity: 1,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphSection;

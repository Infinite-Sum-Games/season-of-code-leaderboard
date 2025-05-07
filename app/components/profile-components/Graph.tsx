"use client";
import { useEffect, useState } from "react";
import { Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card } from "../ui/card";
import { BackgroundGradient } from "../ui/background-gradient";
import type{
  ChartConfig,
} from "@/app/components/ui/chart";

import{
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

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
  <div className="w-full flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-5xl">
      <BackgroundGradient className="p-4 rounded-xl">
        <Card className="bg-[#050217] border border-gray-700 p-8 rounded-xl shadow-lg transition-transform transform">
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
    label: "PRs Opened",
    color: "hsl(271, 49%, 58%)", 
  },
  merged: {
    label: "PRs Merged",
    color: "hsl(271, 51%, 74%)", 
  },
  solved: {
    label: "Issues Solved",
    color: "hsl(271, 100%, 62%, 0.62)", 
  }
} satisfies ChartConfig;

const radarChartConfig = {
  code: {
    label: "Code Contribution",
    color: "hsl(53,100%,67%)", 
  },
} satisfies ChartConfig;

const GraphSection = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Simulating API fetch with dummy data
    const dummyData: GraphData = {
      prStats: {
        opened: 15,
        merged: 12,
        issuesSolved: 8
      },
      contributionStats: {
        codeContribution: 80,
        testing: 65,
        bugFixes: 75,
        documentation: 50,
        features: 60,
        uiux: 70
      }
    };

    const timeout = setTimeout(() => {
      try {
        setGraphData(dummyData);
        setLoading(false);
        console.log("Loaded graph data:", dummyData);
      } catch (err) {
        console.error("Error loading graph data:", err);
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
    { name: "PRs Opened", value: graphData.prStats.opened, fill: "#f0b073" },
    { name: "PRs Merged", value: graphData.prStats.merged, fill: "#eeea97" },
    { name: "Issues Solved", value: graphData.prStats.issuesSolved, fill: "#9cd0e4" }
  ];

  // Format data for radar chart
  const radarData = [
    { attribute: "Code Contribution", value: graphData.contributionStats.codeContribution },
    { attribute: "Testing", value: graphData.contributionStats.testing },
    { attribute: "Bugs Fixes", value: graphData.contributionStats.bugFixes },
    { attribute: "Documentation", value: graphData.contributionStats.documentation },
    { attribute: "Features", value: graphData.contributionStats.features },
    { attribute: "UI/UX", value: graphData.contributionStats.uiux }
  ];

  return (
    <div
      className="relative w-full bg-orange-100 shadow-lg p-6 mt-8 rounded-xl"
      style={{ width: "66%" }}
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-yellow-800 mb-6">
        Contribution Analytics
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* Pie Chart */}
        <div className="flex-1 min-w-0 bg-sky-100 bg-opacity-60 border border-yellow-800 rounded-xl shadow-xl p-4 transform transition-all duration-300 hover:scale-102 hover:border-gray-500">
          <h3 className="text-xl font-semibold mb-2 text-center text-yellow-800">
            Contribution Chart
          </h3>
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto h-[250px] w-full"
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
                outerRadius={100}
                label={false}
              />
            </PieChart>
          </ChartContainer>
          <div className="flex justify-center gap-6 mt-2">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }}></div>
                <span className="text-s text-yellow-800 font-bold">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="flex-1 min-w-0 bg-sky-100 bg-opacity-60 border border-yellow-800 rounded-xl shadow-xl p-4 transform transition-all duration-300 hover:scale-102 hover:border-gray-500">
          <h3 className="text-xl font-semibold text-yellow-800 mb-2 text-center">
            Issue Distribution
          </h3>
          <ChartContainer
            config={radarChartConfig}
            className="mx-auto h-[275px] w-full"
          >
            <RadarChart outerRadius={100} cy={135} data={radarData} >
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarGrid stroke="#f28b30" />
              <PolarAngleAxis
                dataKey="attribute"
                tick={{ fill: '#1b497d', fontSize: 16 , dy:3 }}
                tickLine={false}
                tickSize={15}
              />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="#f28b30"
                fill="hsl(35,100%,57%)"
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fill: "#f28b30",
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default GraphSection;
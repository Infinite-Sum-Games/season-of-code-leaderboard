"use client";
import useLeaderboardStore from "@/app/useLeaderboardStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { Card } from "../ui/card";
import { Spotlight } from "../ui/spotlight";

export interface Profile {
  name: string;
  username: string;
  rank: number;
  allTimeRank: number;
  bounty: number;
  pendingIssues: number;
}

const LoadingCard = () => (
  <div className="w-full flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-5xl">
      <BackgroundGradient className="p-4 rounded-xl">
        <Card className="bg-[#050217] border border-gray-700 p-8 rounded-xl shadow-lg transition-transform transform">
          <div className="text-center text-gray-300">
            <h2 className="text-3xl text-[#c8c7cc] font-semibold">
              Searching for your profile...
            </h2>
            <p className="mt-2 text-lg">Please wait for a while 😊</p>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  </div>
);

const ErrorCard = () => (
  <div className="w-full flex justify-center px-4 py-8">
    <div className="w-full max-w-5xl">
      <BackgroundGradient className="p-4 rounded-xl">
        <Card className="bg-[#050217] border border-gray-700 p-8 rounded-xl shadow-lg transition-transform transform">
          <div className="text-center text-gray-300">
            <h2 className="text-3xl text-[#c8c7cc] font-semibold">
              Oops! Something went wrong.
            </h2>
            <p className="mt-2 text-lg">Please try again later 😊</p>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  </div>
);

const BountyBar = ({
  value,
  max,
  height,
}: {
  value: number;
  max: number;
  height: number;
}) => {
  const percentage = (value / max) * 100;
  const milestones = [25, 50, 75, 100];

  return (
    <div className="relative" style={{ height: `${height}px`, width: "60px" }}>
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50 rounded-full overflow-hidden border border-gray-700">
        {/* Filled upto portion */}
        <div
          className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-500 to-yellow-300"
          style={{ height: `${percentage}%` }}
        />

        {/* Milestone markers */}
        {milestones.map((milestone) => (
          <div
            key={milestone}
            className="absolute w-full h-0.5 bg-white bg-opacity-30 flex items-center"
            style={{ bottom: `${milestone}%` }}
          >
            {milestone % 50 === 0 && (
              <span className="absolute -left-8 text-xs text-gray-400">
                {milestone}%
              </span>
            )}
            <div className="absolute -right-2 w-2 h-2 rounded-full bg-white"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  const [userData, setUserData] = useState<Profile | null>(null);

  useEffect(() => {
    const dummyData: Profile = {
      name: "Jayadev D",
      username: "FLASH2332",
      rank: 7,
      allTimeRank: 2,
      bounty: 500,
      pendingIssues: 2,
    };

    const timeout = setTimeout(() => {
      setUserData(dummyData);
      setLoading(false);
      console.log("Loaded user data:", dummyData);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen m-auto flex flex-row justify-center items-center">
        <LoadingCard />
      </div>
    );
  if (!userData)
    return (
      <div className="w-full h-screen flex flex-row justify-center items-center">
        <ErrorCard />
      </div>
    );

  return (
    <div className="relative w-full h-[100vh]">
      <Spotlight fill="yellow" className="hidden md:block" />
      <div
        className="relative h-full p-6 border-r border-gray-800 bg-gradient-to-b from-[#050217] to-[#0a0531]"
        style={{ width: "66%" }}
      >
        {/* Current Rank Badge */}
        <div className="absolute top-8 right-12 flex justify-center items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center">
              <div className="text-5xl text-black font-bold">
                {userData.rank}
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-yellow-500 text-xs font-bold px-3 py-1 rounded-full">
              RANK
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-purple-500 p-1 bg-gradient-to-br from-purple-500 to-blue-500">
              <Image
                src={`https://github.com/${userData.username}.png`}
                alt={`${userData.username} profile`}
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              {userData.name}
            </h2>
            <p className="text-xl text-purple-300 font-light mt-1">
              @{userData.username}
            </p>
            <div className="flex items-center mt-3 bg-purple-900 bg-opacity-30 px-4 py-2 rounded-lg border border-purple-500">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-green-400">Active Hunter</span>
            </div>
          </div>
        </div>

        {/* Details Container */}
        <div className="mt-8 flex flex-row gap-20">
          {/* Stats Container */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full">
              <StatCard
                value={userData.bounty}
                label="Bounty Points"
                color="#0ea5e9"
                icon="💰"
                size="large"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <StatCard
                  value={2}
                  label="All Time Best Rank"
                  color="#16a34a"
                  icon="🏆"
                  size="small"
                />
              </div>
              <div className="flex-1">
                <StatCard
                  value={userData.pendingIssues}
                  label="Pending Issues"
                  color="#f59e0b"
                  icon="⏳"
                  size="small"
                />
              </div>
            </div>
          </div>

          {/* Bounty Progress Bar */}
          <div className="flex flex-col items-start ml-4">
            <h3 className="text-white font-semibold mb-2">Bounty Progress</h3>
            <div className="flex items-end gap-4">
              <BountyBar value={userData.bounty} max={1000} height={200} />
              <div className="text-sm text-gray-400 mb-4">
                <div>Goal: 1000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 border-t border-gray-800 pt-4">
          <h3 className="text-xl font-semibold text-white mb-3">
            Recent Activity
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            <ActivityItem
              text="Solved issue #423: Database optimization"
              time="2d ago"
            />
            <ActivityItem
              text="Submitted PR for bug fix on authentication service"
              time="5d ago"
            />
            <ActivityItem
              text="Reached Rank 2 on the leaderboard"
              time="1w ago"
              highlight
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  value,
  label,
  color,
  icon,
  size = "small",
}: {
  value: number;
  label: string;
  color: string;
  icon: string;
  size?: "small" | "large";
}) => {
  return (
    <div
      className={`bg-gray-900 bg-opacity-60 border border-gray-700 rounded-xl shadow-lg p-4 text-center transform transition-all duration-300 hover:scale-105 hover:border-gray-500 ${
        size === "large" ? "w-full" : "flex-1"
      }`}
    >
      <div className="flex justify-center mb-1">
        <span className={`${size === "large" ? "text-2xl" : "text-xl"}`}>
          {icon}
        </span>
      </div>
      <p
        className={`${size === "large" ? "text-4xl" : "text-3xl"} font-bold`}
        style={{ color }}
      >
        {value}
      </p>
      <p
        className={`${
          size === "large" ? "text-sm" : "text-xs"
        } text-gray-400 mt-1 font-medium`}
      >
        {label}
      </p>
    </div>
  );
};

const ActivityItem = ({
  text,
  time,
  highlight = false,
}: {
  text: string;
  time: string;
  highlight?: boolean;
}) => (
  <div
    className={`flex justify-between items-center p-2 rounded-lg ${
      highlight
        ? "bg-purple-900 bg-opacity-30 border border-purple-500"
        : "bg-gray-900 bg-opacity-40"
    }`}
  >
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-green-500"></div>
      <p className="text-sm text-gray-300">{text}</p>
    </div>
    <div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  </div>
);

export default ProfileCard;

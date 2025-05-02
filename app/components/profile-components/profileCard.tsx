"use client";
import useLeaderboardStore from "@/app/useLeaderboardStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { Card } from "../ui/card";
import { Spotlight } from "../ui/spotlight";
import VerticalBountyBar from "../ui/bountyBar";

export interface Profile {
  name: string;
  username: string;
  rank: number;
  bounty: number;
  pendingIssues: number;
}

const LoadingCard = () => (
  <div className="w-fit flex items-center justify-center px-4 py-8">
    <div className="w-fit max-w-md">
      <BackgroundGradient className="p-4 rounded-xl">
        <Card className="bg-[#050217] border border-gray-700 p-6 rounded-xl shadow-lg transition-transform transform">
          <div className="text-center text-gray-300">
            <h2 className="text-2xl text-[#c8c7cc] font-semibold">
              Searching for your profile...
            </h2>
            <p>Please wait for a while 😊</p>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  </div>
);

const ErrorCard = () => (
  <div className="w-fit flex justify-center px-4 py-8">
    <div className="w-fit max-w-md">
      <BackgroundGradient className="p-4 rounded-xl">
        <Card className="bg-[#050217] border border-gray-700 p-6 rounded-xl shadow-lg transition-transform transform">
          <div className="text-center text-gray-300">
            <h2 className="text-2xl text-[#c8c7cc] font-semibold">
              Oops! Something went wrong.
            </h2>
            <p>Please try again later 😊</p>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  </div>
);

const ProfileCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  const [userData, setUserData] = useState<Profile | null>(null);

  /* useEffect(() => {
    const fetchUserData = async () => {
      if (!session || !session.user) return;
      try {
        const response = await fetch(`api/user?username=${session.user.name}`);
        if (response.status !== 200) return;
        const data: Profile = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);*/
  useEffect(() => {
    const dummyData: Profile = {
      name: "Jayadev D",
      username: "FLASH2332",
      rank: 2,
      bounty: 500,
      pendingIssues: 2,
    };

    const timeout = setTimeout(() => {
      setUserData(dummyData);
      setLoading(false);
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
    <div className="relative w-full max-w-2xl h-[100vh]">
      <Spotlight fill="yellow" />
      <div className="relative h-full p-5 border ">
        <div className="absolute flex justify-center">
          <div className="text-7xl text-yellow-500 font-bold">
            {useLeaderboardStore.getState().getRank(userData.username)}
          </div>
        </div>
        <div className="flex flex-col flex-row items-center gap-5 pt-20 pl-10">
          <Image
            src={`https://github.com/${userData.username}.png`}
            alt={`${userData.username} profile`}
            width={130}
            height={130}
            className="rounded-full"
          />
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
            <p className="text-lg text-white font-thin">@{userData.username}</p>
          </div>
        </div>
        {/*Vertical bar and Stats*/}
        <div className=" flex justify-between items-center gap-2">
          <div className="flex flex-1 justify-around">
            <StatCard
              value={userData.rank}
              label="Current Rank"
              color="#16a34a"
            />
            <StatCard
              value={userData.bounty}
              label="Bounty Points"
              color="#0ea5e9"
            />
            <StatCard
              value={userData.pendingIssues}
              label="Pending Issues"
              color="#f59e0b"
            />
          </div>
          <div>
            <VerticalBountyBar
              value={userData.bounty}
              max={1000}
              height={240}
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
}: {
  value: number;
  label: string;
  color: string;
}) => (
  <div className="bg-white border border-gray-300 rounded-xl shadow p-4 w-32 text-center">
    <p className="text-3xl font-bold" style={{ color }}>
      {value}
    </p>
    <p className="text-sm text-gray-600 mt-1">{label}</p>
  </div>
);

export default ProfileCard;

"use client";
import Image from "next/image";
import { Card, CardDescription } from "../ui/card";
import { Spotlight } from "../ui/spotlight";
import { BackgroundGradient } from "../ui/background-gradient";
import { useEffect, useState } from "react";
import useLeaderboardStore from "@/app/useLeaderboardStore";
import { useSession } from "next-auth/react";

interface Issue {
  issueStatus: boolean;
  url: string;
  prCount: number;
}

interface UserCardProps {
  fullname: string;
  rollNumber: string;
  username: string;
  completedIssues: Issue[];
  incompleteIssues: Issue[];
  completedCount: number;
  incompleteCount: number;
  bounty: number;
}

const UserCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserCardProps | null>(null);

  const { data: session } = useSession();
  
  const getUserData = async () => {
    if (!session || !session.user) {
      return;
    }
    const username = session.user.name;
    try {
      const response = await fetch(`api/user?username=${username}`, {
        method: "GET",
      });

      if (response.status !== 200) {
        return false;
      }
      const data = await response.json();

      setUserData(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      await getUserData();
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center px-4">
        <div className="w-1/2">
          <BackgroundGradient className="p-4">
            <Card className="bg-[#050217] border-1 pb-4 relative rounded-xl shadow-lg">
              <div className="px-4 pt-4 text-center text-gray-300">
                <h2 className="text-xl sm:text-2xl text-[#c8c7cc] font-semibold">
                  Loading user data...
                </h2>
              </div>
            </Card>
          </BackgroundGradient>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full flex justify-center px-4">
        <div className="w-1/2">
          <BackgroundGradient className="p-4">
            <Card className="bg-[#050217] border-1 pb-4 relative rounded-xl shadow-lg">
              <div className="px-4 pt-4 text-center text-gray-300">
                <h2 className="text-xl sm:text-2xl text-[#c8c7cc] font-semibold">
                  Fetching Your Data
                </h2>
                <p>Please wait for a while 😊</p>
              </div>
            </Card>
          </BackgroundGradient>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-4">
      <BackgroundGradient className="p-4">
        <Spotlight fill="blue" />
        <Card className="bg-[#050217] border-1 relative rounded-xl shadow-lg">
          <div className="absolute top-[-40px] sm:top-[-60px] left-1/2 transform -translate-x-1/2">
            <div className="text-6xl sm:text-8xl text-[#ffcc00] font-bold animate-glow">
              {useLeaderboardStore.getState().getRank(userData.username)}
            </div>
          </div>
          <div className="flex items-start gap-4 p-4">
            <div className="flex-shrink-0">
              <Image
                src={`https://github.com/${userData.username}.png`}
                alt={`${userData.username} profile`}
                width={96}
                height={96}
                className="rounded-lg border-2"
                onError={() => console.error("Error loading GitHub profile image.")}
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl sm:text-3xl text-[#6ee7b7] font-semibold">
                {userData.fullname}
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                @{userData.username}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Roll No: {userData.rollNumber}
              </p>
            </div>
          </div>
          
          <div className="space-y-4 p-4">
            <CardDescription className="text-lg sm:text-xl text-gray-300">
              🎯 Completed Issues: <strong>{userData.completedCount}</strong>
            </CardDescription>
            <CardDescription className="text-lg sm:text-xl text-gray-300">
              📝 Incomplete Issues: <strong>{userData.incompleteCount}</strong>
            </CardDescription>
            <CardDescription className="text-lg sm:text-xl text-gray-300">
              🏆 Total Bounty Earned: <strong>{userData.bounty}</strong>
            </CardDescription>
            
            <div className="text-gray-300 text-sm sm:text-base">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Completed Issues:</h3>
              {userData.completedIssues.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                  {userData.completedIssues.map((issue, index) => (
                    <li key={index} className="break-all">
                      <a
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {issue.url}
                      </a>
                      {issue.prCount > 0 && (
                        <span className="ml-2 text-xs sm:text-sm text-green-400">
                          ({issue.prCount} PR{issue.prCount > 1 ? 's' : ''})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No completed issues yet!</p>
              )}
              
              <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">In Progress Issues:</h3>
              {userData.incompleteIssues.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                  {userData.incompleteIssues.map((issue, index) => (
                    <li key={index} className="break-all">
                      <a
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {issue.url}
                      </a>
                      {issue.prCount > 0 && (
                        <span className="ml-2 text-xs sm:text-sm text-yellow-400">
                          ({issue.prCount} PR{issue.prCount > 1 ? 's' : ''})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No issues in progress!</p>
              )}
            </div>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  );
};

export default UserCard;
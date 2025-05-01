'use client';
import useLeaderboardStore from '@/app/useLeaderboardStore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BackgroundGradient } from '../ui/background-gradient';
import { Card, CardDescription } from '../ui/card';
import { Spotlight } from '../ui/spotlight';

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

const UserCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserCardProps | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session || !session.user) return;
      try {
        const response = await fetch(`api/user?username=${session.user.name}`);
        if (response.status !== 200) return;
        const data: UserCardProps = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [session]);

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
    <div className="relative w-fit max-w-3xl mx-auto my-8 mt-16">
      <BackgroundGradient className="p-4 rounded-xl">
        <Spotlight fill="blue" />
        <Card className="relative bg-[#050217] border border-gray-700 rounded-2xl shadow-lg transition-transform transform">
          <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2">
            <div className="text-8xl text-[#ffcc00] font-bold animate-glow">
              {useLeaderboardStore.getState().getRank(userData.username)}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-6 p-6 pt-16">
            <Image
              src={`https://github.com/${userData.username}.png`}
              alt={`${userData.username} profile`}
              width={96}
              height={96}
              className="rounded-2xl w-32 sm:w-48 h-32 sm:h-48 border border-gray-600"
              onError={() =>
                console.error('Error loading GitHub profile image.')
              }
            />
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-2xl md:text-3xl text-[#6ee7b7] font-semibold">
                {userData.fullname}
              </h2>
              <p className="text-lg text-gray-300">@{userData.username}</p>
              <p className="text-gray-400 text-sm">
                Roll No: {userData.rollNumber}
              </p>
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="w-full flex flex-col md:flex-row gap-1 text-white">
              <StatCard
                value={userData.bounty}
                label="Bounty Earned"
                color="#58ff2e"
              />
              <StatCard
                value={userData.completedCount}
                label="Completed Issues"
                color="#46e9ff"
              />
              <StatCard
                value={userData.incompleteCount}
                label="In Progress Issues"
                color="#fbbf24"
              />
            </div>
            <div className="mt-6 flex flex-col gap-6">
              <IssueList
                title="Completed Issues"
                issues={userData.completedIssues}
                emptyMessage="No completed issues yet!"
                color="green-400"
              />
              <IssueList
                title="In Progress Issues"
                issues={userData.incompleteIssues}
                emptyMessage="No issues in progress!"
                color="yellow-400"
              />
            </div>
          </div>
        </Card>
      </BackgroundGradient>
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
  <div className="w-full border border-gray-700 rounded-2xl flex flex-row justify-between align-middle md:justify-center gap-4 md:gap-0 md:flex-col items-center p-2 md:p-3 hover:bg-[#050217] transition-colors">
    <p className="text-4xl font-bold" style={{ color }}>
      {value}
    </p>
    <div className="mt-2 flex justify-center">
      <p className="w-full inline-flex items-center rounded-xl px-2 py-1 text-md md:text-sm font-medium text-white bg-gray-700 bg-opacity-55">
        {label}
      </p>
    </div>
  </div>
);

const IssueList = ({
  title,
  issues,
  emptyMessage,
  color,
}: {
  title: string;
  issues: Issue[];
  emptyMessage: string;
  color: string;
}) => (
  <div className="text-gray-300 text-sm w-full">
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    {issues.length > 0 ? (
      <div className="bg-[#1a1a2e] rounded-lg shadow-inner flex flex-col overflow-hidden">
        {issues.map((issue, index) => (
          <div key={index}>
            <CardDescription className="flex items-center justify-between gap-2 p-3 transition-colors hover:bg-gray-800">
              <a
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline break-all transition-colors hover:text-blue-300"
              >
                {issue.url}
              </a>
              {issue.prCount > 0 && (
                <span className={`ml-2 text-xs text-${color}`}>
                  ({issue.prCount} PR{issue.prCount > 1 ? 's' : ''})
                </span>
              )}
            </CardDescription>
            {index !== issues.length - 1 && <hr className="border-gray-600" />}
          </div>
        ))}
      </div>
    ) : (
      <p>{emptyMessage}</p>
    )}
  </div>
);

export default UserCard;

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
  <div className="flex w-fit items-center justify-center px-4 py-8">
    <div className="w-fit max-w-md">
      <BackgroundGradient className="rounded-xl p-4">
        <Card className="transform rounded-xl border border-gray-700 bg-[#050217] p-6 shadow-lg transition-transform">
          <div className="text-center text-gray-300">
            <h2 className="font-semibold text-2xl text-[#c8c7cc]">
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
  <div className="flex w-fit justify-center px-4 py-8">
    <div className="w-fit max-w-md">
      <BackgroundGradient className="rounded-xl p-4">
        <Card className="transform rounded-xl border border-gray-700 bg-[#050217] p-6 shadow-lg transition-transform">
          <div className="text-center text-gray-300">
            <h2 className="font-semibold text-2xl text-[#c8c7cc]">
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
      <div className="m-auto flex h-screen w-full flex-row items-center justify-center">
        <LoadingCard />
      </div>
    );
  if (!userData)
    return (
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <ErrorCard />
      </div>
    );

  return (
    <div className="relative mx-auto my-8 mt-16 w-fit max-w-3xl">
      <BackgroundGradient className="rounded-xl p-4">
        <Spotlight fill="blue" />
        <Card className="relative transform rounded-2xl border border-gray-700 bg-[#050217] shadow-lg transition-transform">
          <div className="-translate-y-1/2 absolute inset-x-0 top-0 flex justify-center">
            <div className="animate-glow font-bold text-8xl text-[#ffcc00]">
              {useLeaderboardStore.getState().getRank(userData.username)}
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 p-6 pt-16 lg:flex-row">
            <Image
              src={`https://github.com/${userData.username}.png`}
              alt={`${userData.username} profile`}
              width={96}
              height={96}
              className="h-32 w-32 rounded-2xl border border-gray-600 sm:h-48 sm:w-48"
              onError={() =>
                console.error('Error loading GitHub profile image.')
              }
            />
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h2 className="font-semibold text-2xl text-[#6ee7b7] md:text-3xl">
                {userData.fullname}
              </h2>
              <p className="text-gray-300 text-lg">@{userData.username}</p>
              <p className="text-gray-400 text-sm">
                Roll No: {userData.rollNumber}
              </p>
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="flex w-full flex-col gap-1 text-white md:flex-row">
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
  <div className="flex w-full flex-row items-center justify-between gap-4 rounded-2xl border border-gray-700 p-2 align-middle transition-colors hover:bg-[#050217] md:flex-col md:justify-center md:gap-0 md:p-3">
    <p
      className="font-bold text-4xl"
      style={{ color }}
    >
      {value}
    </p>
    <div className="mt-2 flex justify-center">
      <p className="inline-flex w-full items-center rounded-xl bg-gray-700 bg-opacity-55 px-2 py-1 font-medium text-md text-white md:text-sm">
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
  <div className="w-full text-gray-300 text-sm">
    <h3 className="mb-2 font-semibold text-lg">{title}</h3>
    {issues.length > 0 ? (
      <div className="flex flex-col overflow-hidden rounded-lg bg-[#1a1a2e] shadow-inner">
        {issues.map((issue, index) => (
          <div key={issue.url}>
            <CardDescription className="flex items-center justify-between gap-2 p-3 transition-colors hover:bg-gray-800">
              <a
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-400 transition-colors hover:text-blue-300 hover:underline"
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

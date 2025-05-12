'use client';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import useLeaderboardStore from '@/app/useLeaderboardStore';
import { useEffect, useState } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'; // Import sorting icons
import { Card, CardDescription, CardHeader } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Projects from './projects';
import Rowcards from './rowcards';

export type TUserData = {
  fullName: string;
  username: string;
  bounty: number;
  accountActive: boolean;
  _count: { Solution: string };
};

const Leaderboard = () => {
  const { setUser } = useLeaderboardStore();
  const [leaderboardData, setLeaderboardData] = useState<TUserData[]>([]);
  const [sortCriteria, setSortCriteria] = useState<'PRs' | 'Bounty' | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // useEffect(() => {
  //   const getLeaderboardData = async () => {
  //     try {
  //       const request = await fetch('/api/leaderboard', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (request.status !== 200) {
  //         console.log('Error fetching leaderboard data', request.status);
  //       }

  //       const data = await request.json();
  //       setLeaderboardData(data.leaderboard);

  //       data.leaderboard.forEach((userData: TUserData, index: number) => {
  //         const rank = index + 1;
  //         setUser(
  //           userData.fullName,
  //           userData.username,
  //           rank,
  //           userData.bounty,
  //           userData.accountActive,
  //           userData._count,
  //         );
  //       });
  //     } catch (error) {
  //       console.log('Error fetching leaderboard data', error);
  //     }
  //   };
  //   getLeaderboardData();
  // }, [setUser]);

  useEffect(() => {
    const mockData: TUserData[] = [
      {
        fullName: 'Alice Johnson',
        username: 'alicejohnson',
        bounty: 120,
        accountActive: true,
        _count: { Solution: '15' },
      },
      {
        fullName: 'Bob Smith',
        username: 'bobsmith',
        bounty: 85,
        accountActive: true,
        _count: { Solution: '20' },
      },
      {
        fullName: 'Charlie Brown',
        username: 'charliebrown',
        bounty: 60,
        accountActive: false,
        _count: { Solution: '10' },
      },
      {
        fullName: 'Daisy Ridley',
        username: 'daisyridley',
        bounty: 100,
        accountActive: true,
        _count: { Solution: '25' },
      },
      {
        fullName: 'Ethan Hunt',
        username: 'ethanhunt',
        bounty: 150,
        accountActive: true,
        _count: { Solution: '30' },
      },
      {
        fullName: 'Ethan Hunt',
        username: 'ethanhunt1',
        bounty: 150,
        accountActive: true,
        _count: { Solution: '30' },
      },
      {
        fullName: 'Ethan Hunt',
        username: 'ethanhunt2',
        bounty: 150,
        accountActive: true,
        _count: { Solution: '30' },
      },
      {
        fullName: 'Ethan Hunt',
        username: 'ethanhunt3',
        bounty: 150,
        accountActive: true,
        _count: { Solution: '30' },
      },
    ];

    setLeaderboardData(mockData);

    mockData.forEach((userData, index) => {
      const rank = index + 1;
      setUser(
        userData.fullName,
        userData.username,
        rank,
        userData.bounty,
        userData.accountActive,
        userData._count,
      );
    });
  }, [setUser]);

  const sortLeaderboard = (criteria: 'PRs' | 'Bounty') => {
    let order = sortOrder;
    if (sortCriteria === criteria) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      order = 'desc';
    }
    setSortCriteria(criteria);
    setSortOrder(order);

    const sortedData = [...leaderboardData].sort((a, b) => {
      const aValue =
        criteria === 'PRs' ? Number.parseInt(a._count.Solution) : a.bounty;
      const bValue =
        criteria === 'PRs' ? Number.parseInt(b._count.Solution) : b.bounty;

      return order === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setLeaderboardData(sortedData);
  };

  const getSortIcon = (criteria: 'PRs' | 'Bounty') => {
    if (sortCriteria === null && criteria === 'Bounty') {
      return (
        <div className="relative">
          <FaSort className="absolute top-0 left-0 opacity-30" />
          <FaSortDown />
        </div>
      );
    }
    if (sortCriteria !== criteria) {
      return <FaSort />;
    }
    return (
      <div className="relative">
        <FaSort className="absolute top-0 left-0 opacity-30" />
        {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
      </div>
    );
  };

  return (
    <Card className="z-50 h-[85vh] w-full rounded-2xl border-none bg-transparent px-1 shadow-none md:px-8">
      <Tabs
        defaultValue="leaderboard"
        className="w-full"
      >
        <TabsList className="flex h-10 w-full flex-row justify-between bg-[#1d1e3a] text-sm text-white sm:text-base">
          <TabsTrigger
            className="w-full"
            value="leaderboard"
          >
            Leaderboard
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="projects"
          >
            Projects
          </TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard">
          <CardHeader className="px-2 pt-2 pb-1 font-bold text-3xl text-[#3abef9] sm:px-4 sm:pt-4 sm:pb-2 sm:text-6xl">
            Leaderboard
          </CardHeader>
          <CardDescription className="px-2 pb-2 text-[#c8c7cc] text-sm sm:px-4 sm:pb-4 sm:text-base">
            Refresh the page to see real-time leaderboard updates.
          </CardDescription>
          <div className="mx-1 flex rounded-lg bg-[#1d1b2e] p-2 text-white sm:mx-2 sm:p-4 sm:font-semibold">
            <div className="w-[10%] text-left text-xs sm:text-base">Rank</div>
            <div className="w-[70%] pl-4 text-left text-xs sm:pl-16 sm:text-base">
              Name
            </div>
            <div className="hidden w-[23%] text-center text-sm sm:text-base min-[769px]:block">
              <button
                type="button"
                onClick={() => sortLeaderboard('PRs')}
                className="flex items-center justify-center gap-2 transition-colors duration-200 hover:text-[#3abef9]"
              >
                PR Merged
                {getSortIcon('PRs')}
              </button>
            </div>
            <div className="w-[20%] text-right text-xs sm:w-[13%] sm:text-base">
              <button
                type="button"
                onClick={() => sortLeaderboard('Bounty')}
                className="flex items-center justify-center gap-2 transition-colors duration-200 hover:text-[#3abef9]"
              >
                Bounties
                {getSortIcon('Bounty')}
              </button>
            </div>
          </div>
          <ScrollArea className="relative max-h-[60vh] overflow-y-auto overflow-x-hidden sm:max-h-[54vh]">
            {!leaderboardData || leaderboardData.length === 0 ? (
              <div className="p-4 text-center text-2xl text-[#c8c7cc]">
                Loading Leaderboard...
              </div>
            ) : (
              leaderboardData.map((data, index) => (
                <Rowcards
                  key={data.username}
                  index={index + 1}
                  avatar_url={`https://github.com/${data.username}.png`}
                  fullName={data.fullName}
                  username={data.username}
                  PRmerged={Number.parseInt(data._count.Solution)}
                  bounty={data.bounty}
                />
              ))
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="projects">
          <Projects />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default Leaderboard;

"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardDescription } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Projects from "./projects";
import Rowcards from "./rowcards";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import useLeaderboardStore from "@/app/useLeaderboardStore";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // Import sorting icons

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
  const [sortCriteria, setSortCriteria] = useState<"PRs" | "Bounty" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const getLeaderboardData = async () => {
      try {
        const request = await fetch("/api/leaderboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (request.status !== 200) {
          console.log("Error fetching leaderboard data", request.status);
        }

        const data = await request.json();
        setLeaderboardData(data.leaderboard);

        data.leaderboard.forEach((userData: TUserData, index: number) => {
          const rank = index + 1;
          setUser(
            userData.fullName,
            userData.username,
            rank,
            userData.bounty,
            userData.accountActive,
            userData._count
          );
        });
      } catch (error) {
        console.log("Error fetching leaderboard data", error);
      }
    };
    getLeaderboardData();
  }, [setUser]);

  const sortLeaderboard = (criteria: "PRs" | "Bounty") => {
    let order = sortOrder;
    if (sortCriteria === criteria) {
      order = sortOrder === "asc" ? "desc" : "asc";
    } else {
      order = "desc";
    }
    setSortCriteria(criteria);
    setSortOrder(order);

    const sortedData = [...leaderboardData].sort((a, b) => {
      const aValue = criteria === "PRs" ? parseInt(a._count.Solution) : a.bounty;
      const bValue = criteria === "PRs" ? parseInt(b._count.Solution) : b.bounty;

      return order === "asc" ? aValue - bValue : bValue - aValue;
    });

    setLeaderboardData(sortedData);
  };

  const getSortIcon = (criteria: "PRs" | "Bounty") => {
    if (sortCriteria === null && criteria === "Bounty") {
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
        {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
      </div>
    );
  };


  return (
    <Card className="bg-transparent border-none px-1 md:px-8 rounded-2xl z-50 w-full">
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="flex flex-row justify-between bg-[#1d1e3a] text-sm sm:text-base text-white h-10 w-full">
          <TabsTrigger className="w-full" value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger className="w-full" value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard">
          <CardHeader className="font-bold text-3xl sm:text-6xl pt-2 sm:pt-4 pb-1 sm:pb-2 px-2 sm:px-4 text-[#3abef9]">
            Leaderboard
          </CardHeader>
          <CardDescription className="px-2 sm:px-4 pb-2 sm:pb-4 text-[#c8c7cc] text-sm sm:text-base">
            Refresh the page to see real-time leaderboard updates.
          </CardDescription>
          <div className="flex bg-[#1d1b2e] mx-1 sm:mx-2 p-2 sm:p-4 text-white sm:font-semibold rounded-lg">
            <div className="text-xs sm:text-base w-[10%] text-left">Rank</div>
            <div className="text-xs sm:text-base w-[70%] text-left pl-4 sm:pl-16">Name</div>
            <div className="hidden min-[769px]:block text-sm sm:text-base w-[23%] text-center">
              <button
                onClick={() => sortLeaderboard("PRs")}
                className="flex items-center justify-center gap-2 hover:text-[#3abef9] transition-colors duration-200"
              >
                PR Merged
                {getSortIcon("PRs")}
              </button>
            </div>
            <div className="text-xs sm:text-base w-[20%] sm:w-[13%] text-right">
              <button
                onClick={() => sortLeaderboard("Bounty")}
                className="flex items-center justify-center gap-2 hover:text-[#3abef9] transition-colors duration-200"
              >
                Bounties
                {getSortIcon("Bounty")}
              </button>
            </div>
          </div>
          <ScrollArea className="max-h-[60vh] sm:max-h-[75vh] overflow-y-auto overflow-x-hidden relative">
            {leaderboardData.length === 0 ? (
              <div className="text-center text-2xl text-[#c8c7cc] p-4">
                Loading Leaderboard...
              </div>
            ) : (
              leaderboardData.map((data, index) => (
                <Rowcards
                  key={index}
                  index={index + 1}
                  avatar_url={`https://github.com/${data.username}.png`}
                  fullName={data.fullName}
                  username={data.username}
                  PRmerged={parseInt(data._count.Solution)}
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

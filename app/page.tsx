"use client";
import Image from "next/legacy/image";
import Leaderboard from "./components/dashboard-components/leaderboard";
import { Separator } from "@/app/components/ui/separator";
import Usercard from "./components/dashboard-components/usercard";
import "./globals.css";
import Navbar from "./components/Navbar";
import Snowfall from "./components/dashboard-components/Snowfall";
import Home from "./components/dashboard-components/Home";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session,} = useSession();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col max-h-screen items-center">
          <Navbar />

          {session && session.user ? (
            <div className="w-full flex justify-center items-center pt-20">
              <Usercard />
            </div>
          ) : (
            <Home />
          )}
        </div>

        <div className="md:hidden">
          <Separator orientation="vertical" />
        </div>

        <div className="w-full">
          <Leaderboard />
        </div>
      </div>
      <Image
        src="/snowbg.png"
        alt="Snow Floor"
        layout="fill"
        objectFit="cover"
        priority
        className="object-contain md:block hidden absolute bottom-0 left-0 w-full h-[150px] opacity-80"
      />
      <Snowfall />
    </div>
  );
};

export default Dashboard;

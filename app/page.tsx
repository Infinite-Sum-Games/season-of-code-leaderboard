"use client";
import Image from "next/image";
import Leaderboard from "./components/dashboard-components/leaderboard";
import { Separator } from "@/app/components/ui/separator";
import Usercard from "./components/dashboard-components/usercard";
import "./globals.css";
import Navbar from "./components/Navbar";
import Snowfall from "./components/dashboard-components/Snowfall";
import Home from "./components/dashboard-components/Home";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="h-fit">
      <div className="mx-auto px-3 md:px-0 overflow-clip">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-start items-start">
          <div>
            <Navbar />

            {session && session.user ? (
              <div className="w-full pt-20">
                <Usercard />
              </div>
            ) : (
              <Home />
            )}
          </div>

          <Separator className="md:hidden" />

          <div className="relative mt-[16px]">
            <Leaderboard />
          </div>
        </div>
      </div>
      <Image
        src="/snowbg.png"
        alt="Snow Floor"
        fill
        style={{ objectFit: "cover" }}
        priority
        className="object-contain md:block hidden absolur top-0 bottom-0 left-0 -z-40"
      />
      <Snowfall />
    </div>
  );
};

export default Dashboard;

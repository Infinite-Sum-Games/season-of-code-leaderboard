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
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const { data: session,} = useSession();

  const userCardRef = useRef<HTMLDivElement>(null);
  const [marginBottom, setMarginBottom] = useState(80);

  useEffect(() => {
    const calculateMargin = () => {
      if (userCardRef.current) {
        const height = userCardRef.current.getBoundingClientRect().height;
        const screenWidth = window.innerWidth;

        // Different margin percentages based on screen width
        if (screenWidth <= 320) {
          setMarginBottom(Math.ceil(height * 0.25)); // 25% for 320px
        } else if (screenWidth <= 375) {
          setMarginBottom(Math.ceil(height * 0.20)); // 20% for 375px
        } else if (screenWidth <= 425) {
          setMarginBottom(Math.ceil(height * 0.15)); // 15% for 425px
        }
      }
    };

    // Calculate initially
    calculateMargin();

    // Calculate on window resize
    window.addEventListener('resize', calculateMargin);

    // Set up mutation observer to watch for content changes
    const observer = new MutationObserver(calculateMargin);
    
    if (userCardRef.current) {
      observer.observe(userCardRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', calculateMargin);
      observer.disconnect();
    };
  }, []);

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

        <div className="md:hidden" style={{ marginBottom: `${marginBottom}px` }}>
          <Separator orientation="vertical" />
        </div>

        <div className="w-full">
          <Leaderboard />
        </div>
      </div>
      <Image
        src="/snowbg.png"
        alt="Snow Floor"
        fill
        style={{ objectFit: "cover" }}
        priority
        className="object-contain md:block hidden absolute bottom-0 left-0 w-full h-[150px] opacity-80"
      />
      <Snowfall />
    </div>
  );
};

export default Dashboard;

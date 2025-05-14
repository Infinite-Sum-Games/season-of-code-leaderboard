'use client';
import { Separator } from '@/app/components/ui/separator';
import Leaderboard from './components/dashboard-components/leaderboard';
import Usercard from './components/dashboard-components/usercard';
import './globals.css';
import { useSession } from 'next-auth/react';
import Navbar from './components/Navbar';
import Cloud from './components/dashboard-components/Cloud';
import Home from './components/dashboard-components/Home';
import SunGlareEffect from './components/dashboard-components/SunGlareEffect';

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      <SunGlareEffect />
      <Cloud />

      <div className="h-[80px] shrink-0">
        <Navbar />
      </div>

      <div className="relative flex flex-1 overflow-hidden px-18 py-4">
        <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex h-full flex-col overflow-hidden">
            <div className="min-h-0 flex-1 overflow-hidden">
              {session?.user ? <Usercard /> : <Home />}
            </div>
          </div>

          <Separator className="md:hidden" />

          <div className="flex h-full flex-col overflow-hidden">
            <Leaderboard />
          </div>
        </div>
      </div>

      {/* <Image
        src="/snowbg.png"
        alt="Snow Floor"
        fill
        style={{ objectFit: 'cover' }}
        priority
        className="absolur -z-40 top-0 bottom-0 left-0 hidden object-contain md:block"
      />
      <Snowfall /> */}
    </div>
  );
};

export default Dashboard;

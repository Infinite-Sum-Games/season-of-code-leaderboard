import { Cloud } from 'lucide-react';
import React, { useDebugValue } from 'react';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';
import Badges from '../components/profile-components/BadgesSection';
import GraphSection from '../components/profile-components/Graph';
import Profile from '../components/profile-components/profileCard';
import { BackgroundGradient } from '../components/ui/background-gradient';
import { Card } from '../components/ui/card';

const ProfilePage = () => {
  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <div className="flex flex-col md:flex-row px-4 py-6">
        {/* Left Side: Profile + Graph */}
        <div className="flex flex-col md:w-[60%] gap-0">
          <div>
            <Profile />
          </div>
          <GraphSection />
        </div>

        {/* Right Side: Badges */}
        <div className="md:w-[40%]">
          <Badges />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

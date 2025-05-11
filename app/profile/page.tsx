import React from "react";
import Profile from "../components/profile-components/profileCard";
import GraphSection from "../components/profile-components/Graph";
import Badges from "../components/profile-components/BadgesSection";

const ProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row px-4 py-6 bg-gradient-to-br from-yellow-200 via-white to-sky-200 shadow-xs">
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
  );
};

export default ProfilePage;

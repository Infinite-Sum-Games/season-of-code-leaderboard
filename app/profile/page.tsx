import React from "react";
import Profile from "../components/profile-components/profileCard";
import GraphSection from "../components/profile-components/Graph";
import Badges from "../components/profile-components/Badges";

const ProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row px-4 py-6">
      {/* Left Side: Profile + Graph */}
      <div className="flex flex-col md:w-[70%] gap-0">
        <div>
          <Profile />
        </div>
        <GraphSection />
      </div>

      {/* Right Side: Badges */}
      <div className="md:w-[30%]">
        <Badges />
      </div>
    </div>
  );
};

export default ProfilePage;

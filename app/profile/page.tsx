import React from "react";
import Profile from "../components/profile-components/profileCard";
import GraphSection from "../components/profile-components/Graph";  

const profile = () => {
  return (
    <div className="flex flex-col px-4 py-6 bg-gradient-to-br from-yellow-200 via-white to-sky-200 shadow-xs">
      <Profile/>
      <GraphSection/>
    </div>
  );
};

export default profile;

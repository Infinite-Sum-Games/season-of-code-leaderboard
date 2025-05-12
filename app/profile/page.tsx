import Navbar from '../components/Navbar';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';
import Badges from '../components/profile-components/BadgesSection';
import Profile from '../components/profile-components/profileCard';

const ProfilePage = () => {
  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <Navbar />
      <div className="flex flex-col px-4 py-6 mx-auto mt-16">
        <Profile />
        <Badges />
      </div>
    </>
  );
};

export default ProfilePage;

import Image from "next/image";
import { Card, CardDescription } from "../ui/card";
import { Spotlight } from "../ui/spotlight";
import { BackgroundGradient } from "../ui/background-gradient";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface UserCardProps {
  fullname: string;
  rollNumber: string;
  username: string;
  issues: { issueStatus: boolean; url: string }[];
  issueCount: number;
  bounty: number;
}

const UserCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserCardProps | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { data: session } = useSession();

  useEffect(() => {
    const getUserData = async () => {
      if (!session || !session.user) {
        setLoading(false);
        return;
      }
      const username = session.user.name;
      try {
        const response = await fetch(`api/user?username=${username}`, {
          method: "GET",
        });

        if (response.status !== 200) {
          setLoading(false);
          return;
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [session]);

  useEffect(() => {
    const targetDate = new Date("2025-02-14T00:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="mx-4">
        <BackgroundGradient className="py-4">
          <Card className="bg-[#050217] border-1 pb-6 relative rounded-xl shadow-lg mx-4">
            <div className="px-6 pt-6 text-center text-gray-300">
              <h2 className="text-2xl text-[#c8c7cc] font-semibold">
                Loading user data...
              </h2>
            </div>
          </Card>
        </BackgroundGradient>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="mx-4">
        <BackgroundGradient className="py-4">
          <Card className="bg-[#050217] border-1 pb-6 relative rounded-xl shadow-lg mx-4">
            <div className="px-6 pt-6 text-center text-gray-300">
              <h2 className="text-2xl text-[#c8c7cc] font-semibold">
                Fetching Your Data
              </h2>
              <p>Please wait for a while 😊</p>
            </div>
          </Card>
        </BackgroundGradient>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 mt-8 md:mt-24 min-h-[calc(100vh-16rem)]">
      <div className="max-sm mx-auto">
        <BackgroundGradient className="py-4">
          <Spotlight fill="blue" />
          <Card className="bg-[#050217] border-1 pb-6 relative rounded-xl shadow-lg mx-4">
            <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2">
              <div className="text-8xl text-[#ffcc00] font-bold animate-glow">
                {10}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-2 justify-between items-center px-6 pt-8">
              <div className="flex-shrink-0">
                <Image
                  src={`https://github.com/${userData.username}.png`}
                  alt={`${userData.username} profile`}
                  width={128}
                  height={128}
                  className="rounded-lg border-2"
                  onError={() =>
                    console.error("Error loading GitHub profile image.")
                  }
                />
              </div>

              <div className="text-center space-y-1">
                <h2 className="text-3xl text-[#6ee7b7] font-semibold">
                  {userData.fullname}
                </h2>
                <p className="text-lg text-center text-gray-300">
                  @{userData.username}
                </p>
                <p className="text-gray-400 text-sm">
                  Roll No: {userData.rollNumber}
                </p>
              </div>
            </div>

            <div className="space-y-4 px-6 pt-6">
              <CardDescription className="text-xl text-gray-300">
                🎯 Total Completed Issues:{" "}
                <strong>{userData.issueCount}</strong>
              </CardDescription>
              <CardDescription className="text-xl text-gray-300">
                🏆 Total Bounty Earned: <strong>{userData.bounty}</strong>
              </CardDescription>

              <div className="text-gray-300">
                <h3 className="text-lg font-semibold">
                  Completed Issues:
                </h3>
                {userData.issues.filter((issue) => !issue.issueStatus).length >
                0 ? (
                  <ul className="list-disc list-inside">
                    {userData.issues
                      .filter((issue) => !issue.issueStatus)
                      .map((issue, index) => (
                        <li key={index}>
                          <a
                            href={issue.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {issue.url}
                          </a>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>You are yet to complete an Issue!</p>
                )}
              </div>
            </div>
          </Card>
        </BackgroundGradient>

        {/* Timer Section */}
        <div className="relative z-50 max-w-xl mx-auto mt-1 mb-16">
          <p className="text-sm font-light text-white text-center mb-4">
            Winter Of Code ends in
          </p>
          <div className="flex justify-center gap-2 md:gap-4">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md"
              >
                <span className="text-lg sm:text-2xl md:text-3xl font-bold">
                  {item.value}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

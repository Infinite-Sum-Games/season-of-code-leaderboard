"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

const handleSignIn = async () => {
  // Trigger the GitHub sign-in process
  await signIn("github");
};

export const Home = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2025-02-14T00:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pt-4 text-[#E3E8F1] relative">
      <div className="text-left z-10">
        <h1 className="text-4xl sm:text-6xl font-bold text-[#E3E8F1] mb-6 tracking-tight">
          <span className="text-[#3ABEF9]">Amrita</span> Winter of Code
        </h1>

        <p className="text-md sm:text-base cl:text-lg text-white max-w-md mb-6 sm:mb-8 leading-relaxed">
          Join us for an exciting coding journey at{" "}
          <span className="text-[#3ABEF9]">Amrita Vishwa Vidyapeetham</span>.
          Collaborate, learn, and build innovative projects with a passionate
          coding community.
        </p>

        <div className="mb-8 text-lg font-semibold">
          <p className=" mb-2 text-sm font-light">Winter Of Code ends in</p>
          <div className="flex items-center gap-4 text-center">
            <div className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md">
              <span className="text-xl sm:text-3xl font-bold">
                {timeLeft.days}
              </span>
              <span className="text-xs sm:text-sm">Days</span>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md">
              <span className="text-xl sm:text-3xl font-bold">
                {timeLeft.hours}
              </span>
              <span className="text-xs sm:text-sm">Hours</span>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md">
              <span className="text-xl sm:text-3xl font-bold">
                {timeLeft.minutes}
              </span>
              <span className="text-xs sm:text-sm">Minutes</span>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md">
              <span className="text-xl sm:text-3xl font-bold">
                {timeLeft.seconds}
              </span>
              <span className="text-xs sm:text-sm">Seconds</span>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-8 flex gap-4">
          {/* GitHub Sign In Button */}
          <button
            onClick={handleSignIn}
            className="px-4 py-2 sm:px-8 sm:py-3 bg-gray-800 border border-gray-400 text-white
              text-[#00000] font-semibold text-sm sm:text-lg rounded-lg
              hover:bg-[#3ABEF9] hover:text-[#E3E8F1] transition duration-300 ease-in-out 
              transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] flex
              items-center justify-center gap-2 sm:gap-3"
          >
            <Github size={20} /> {/* GitHub Icon */}
            Log in with GitHub
          </button>
        </div>
        <div className="flex items-center align-middle text-gray-200 text-xs mt-2 sm:px-7">
          <p>Made by</p>
          <a href="https://github.com/Infinite-Sum-Games">
            <Image
              src="/isg.jpeg"
              width={30}
              height={30}
              alt="ISG"
              className="rounded mx-2 w-6 h-6"
            />
          </a>
          <a href="https://github.com/Infinite-Sum-Games">
            <p>Infinite Sum Games</p>
          </a>
        </div>
      </div>
      <div
        className="absolute z-0 animate-rotateSnowflake"
        style={{
          top: "60vh",
          left: "40vw",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/snowflake.png"
          alt="Snowflake"
          width={50}
          height={50}
          priority
          className="object-cover opacity-40"
        />
      </div>
      <div
        className="absolute z-0 animate-rotateSnowflake"
        style={{
          top: "10vh",
          left: "5vw",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/snowflake.png"
          alt="Snowflake"
          width={50}
          height={50}
          priority
          className="object-cover opacity-40"
        />
      </div>
      <div
        className="absolute z-0 animate-rotateSnowflake"
        style={{
          top: "7vh",
          left: "35vw",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/snowflake.png"
          alt="Snowflake"
          width={50}
          height={50}
          priority
          className="object-cover opacity-40"
        />
      </div>
      <div
        className="absolute z-0 animate-rotateSnowflake"
        style={{
          top: "37vh",
          left: "65vw",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/snowflake.png"
          alt="Snowflake"
          width={50}
          height={50}
          priority
          className="object-cover opacity-40"
        />
      </div>

      {/* Snow Background */}
      {/* <Image
          src="/snowbg.png"
          alt="Snow Floor"
          fill
          style={{ objectFit: "cover" }}
          priority
          className="object-contain md:visible absolute bottom-0 left-0 w-full h-[150px] opacity-80"
        /> */}
    </div>
  );
};

export default Home;


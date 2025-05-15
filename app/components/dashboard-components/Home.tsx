'use client';
import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Logtable from '../Logtable';

// Winter theme stuff is commented out.

// import Image from 'next/image';
// import React, { useState, useEffect } from 'react';

const handleSignIn = async () => {
  await signIn('github');
};

export const Home = () => {
  // const [timeLeft, setTimeLeft] = useState({
  //   days: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });

  // useEffect(() => {
  //   const targetDate = new Date('2025-08-15T00:00:00');

  //   const calculateTimeLeft = () => {
  //     const now = new Date();
  //     const difference = targetDate.getTime() - now.getTime();

  //     if (difference > 0) {
  //       setTimeLeft({
  //         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //         minutes: Math.floor((difference / (1000 * 60)) % 60),
  //         seconds: Math.floor((difference / 1000) % 60),
  //       });
  //     } else {
  //       setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  //     }
  //   };

  //   const timer = setInterval(calculateTimeLeft, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className="relative flex w-full flex-col items-center px-4 text-[#E3E8F1] sm:px-10">
      <div className="z-10 mb-6 w-full max-w-screen-lg text-center">
        <h1 className="font-bold text-3xl text-[#E3E8F1] tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-slate-800">Amrita</span> Summer of Code
        </h1>

        {/* <p className="mx-auto mb-4 max-w-md text-sm text-white leading-relaxed sm:text-base">
          Join{' '}
          <span className="font-medium text-slate-800">
            Amrita Vishwa Vidyapeetham
          </span>
          's coding community to learn, collaborate, and build impactful
          projects.
        </p> */}

        {/* Countdown Timer */}
        {/* <div className="mb-6">
          <p className="mb-2 text-sm sm:text-base text-white font-light">
            Summer Of Code ends in
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
              <div
                key={label}
                className="flex h-14 w-14 sm:h-16 sm:w-16 flex-col items-center justify-center rounded-lg 
                bg-white/10 text-slate-800 shadow-lg backdrop-blur-md 
                border border-white/20"
              >
                <span className="font-bold text-lg sm:text-2xl">
                  {Object.values(timeLeft)[idx]}
                </span>
                <span className="text-xs sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* GitHub Login Button */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleSignIn}
            className="flex items-center gap-2 rounded-lg border border-gray-400 bg-slate-800 px-5 py-3 font-semibold text-sm text-white transition duration-300 hover:scale-105 hover:bg-[#3ABEF9] hover:text-[#E3E8F1] focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] sm:text-lg"
          >
            <Github size={20} />
            Log in with GitHub
          </button>
        </div>

        {/* Credits
        <div className="mt-4 flex justify-center items-center text-gray-300 text-xs sm:text-sm">
          <p className="mr-1">Made by</p>
          <a
            href="https://github.com/Infinite-Sum-Games"
            className="flex items-center space-x-2 hover:underline"
          >
            <Image
              src="/isg.jpeg"
              width={30}
              height={30}
              alt="ISG"
              className="h-6 w-6 sm:h-7 sm:w-7 rounded"
            />
            <span>Infinite Sum Games</span>
          </a>
        </div> */}
      </div>

      {/* Log Table */}
      <div className="flex w-full justify-center">
        <div className="max-h-screen w-full max-w-screen-md px-2 ">
          <Logtable />
        </div>
      </div>

      {/* <div
        className="absolute z-0 animate-rotateSnowflake"
        style={{
          top: '60vh',
          left: '40vw',
          transform: 'translate(-50%, -50%)',
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
          top: '10vh',
          left: '5vw',
          transform: 'translate(-50%, -50%)',
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
          top: '7vh',
          left: '35vw',
          transform: 'translate(-50%, -50%)',
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
          top: '37vh',
          left: '65vw',
          transform: 'translate(-50%, -50%)',
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
      </div> */}

      {/* Snow Background */}

      {/* Optional: Snowflake Background (Uncomment if needed) */}
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

'use client';
import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const handleSignIn = async () => {
  // Trigger the GitHub sign-in process
  await signIn('github');
};

export const Home = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-08-15T00:00:00');

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
    <div className="relative flex w-full flex-col items-center justify-center pt-4 text-[#E3E8F1]">
      <div className="z-10 text-left">
        <h1 className="mb-6 font-bold text-4xl text-[#E3E8F1] tracking-tight sm:text-5xl">
          <span className="text-[#3ABEF9]">Amrita</span> Summer of Code
        </h1>

        <p className="mb-6 max-w-md cl:text-lg text-md text-white leading-relaxed sm:mb-8 sm:text-base">
          After a successful Winter of Code, the ACM student chapter at{' '}
          <span className="text-[#3ABEF9]">
            Amrita Vishwa Vidyapeetham, Coimbatore
          </span>{' '}
          is back with the <strong>Summer of Code</strong>. Collaborate, learn,
          and build innovative projects with a passionate coding community.
        </p>

        <div className="mb-8 font-semibold text-lg">
          <p className=" mb-2 font-light text-sm">Summer Of Code ends in</p>
          <div className="flex items-center gap-4 text-center">
            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#3ABEF9] text-[#070F2B] shadow-md sm:h-12 sm:w-12">
              <span className="font-bold text-xl sm:text-xl">
                {timeLeft.days}
              </span>
              <span className="text-xs sm:text-[0.6rem]">Days</span>
            </div>

            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#3ABEF9] text-[#070F2B] shadow-md sm:h-12 sm:w-12">
              <span className="font-bold text-xl sm:text-xl">
                {timeLeft.hours}
              </span>
              <span className="text-xs sm:text-[0.6rem]">Hours</span>
            </div>

            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#3ABEF9] text-[#070F2B] shadow-md sm:h-12 sm:w-12">
              <span className="font-bold text-xl sm:text-xl">
                {timeLeft.minutes}
              </span>
              <span className="text-xs sm:text-[0.6rem]">Minutes</span>
            </div>

            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#3ABEF9] text-[#070F2B] shadow-md sm:h-12 sm:w-12">
              <span className="font-bold text-xl sm:text-xl">
                {timeLeft.seconds}
              </span>
              <span className="text-xs sm:text-[0.6rem]">Seconds</span>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-8 flex gap-4">
          {/* GitHub Sign In Button */}
          <button
            type="button"
            onClick={handleSignIn}
            className="flex transform cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-400 bg-gray-800 px-4 py-2 font-semibold text-[#00000] text-sm text-white transition duration-300 ease-in-out hover:scale-102 hover:bg-[#3ABEF9] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] sm:gap-3 sm:px-8 sm:py-3 sm:text-lg"
          >
            <Github size={20} />
            Log in with GitHub
          </button>
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

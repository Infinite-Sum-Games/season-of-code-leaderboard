"use client";
import Image from "next/image";
import { Card } from "../ui/card";
import { GitPullRequest } from "lucide-react";

export interface RowcardsProps {
  index: number;
  avatar_url?: string;
  fullName: string;
  username: string;
  PRmerged: number;
  bounty: number;
}

const Rowcards = (props: RowcardsProps) => {
  return (
    <Card
      className="flex items-center p-4 mx-2 my-3 border-none h-[3.5rem] sm:h-[5.5rem]  bg-cover"
      style={{ backgroundImage: "url('cardBackground.png')" }}
    >
      <div className="flex items-center w-full">
        <p className="text-base sm:text-lg text-[#f2f2f3] font-semibold sm:pl-2 w-[10%]">
          {props.index}
        </p>

        <div className="w-[70%] flex items-center">
          <Image
            src={props.avatar_url || "/default-avatar.png"}
            alt="profile"
            width={64}
            height={64}
            className="rounded-full w-10 h-10 sm:w-14 sm:h-14"
          />
          <div className="flex flex-col items-start pl-4">
            <p className=" text-sm text-[#f2f2f3] sm:text-base md:text-lg lg:text-lg max-h-10 overflow-hidden text-ellipsis whitespace-pre max-w-[5rem] min-[400px]:max-w-[10rem] min-[480px]:max-w-[16rem] min-800px:max-w-[5rem] min-[900px]:max-w-[7rem] lg:max-w-[8rem] min-1280px:max-w-[250px] min-1680px:max-w-[400px]">
              {props.fullName}
            </p>
            <p className="text-sm text-gray-200 hidden md:block min-800px:text-xs min-900px:text-sm">
              @{props.username}
            </p>
          </div>
        </div>

        <div className="w-[20%] hidden justify-center sm:flex">
          <GitPullRequest
            className="bg-slate-600 rounded-full p-1"
            color="rgb(94 234 212)"
          />
          <p className="text-[#f2f2f3] font-semibold text-sm sm:text-base pl-2">
            {props.PRmerged}
          </p>
        </div>

        <div className="w-[40%] flex items-center justify-end sm:w-[20%]">
          <p className="text-base sm:text-2xl font-bold text-[#FFD700]">
            {props.bounty}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Rowcards;

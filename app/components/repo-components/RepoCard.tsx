import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent, // Note: CardContent is imported but not used in the provided snippet. Will keep it if you plan to use it.
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
// import { Progress } from '@/app/components/ui/progress'; // Not used in the snippet
import type { ReposData } from '@/app/store/useRepositoryStore';
import { ChevronRight, Github } from 'lucide-react';
import React from 'react';

const RepoCard = (props: ReposData) => {
  return (
    <Card className="bg-[#93B6F6] border border-white/20 shadow-md w-full">
      <div className="flex h-full flex-row items-center justify-between">
        <div>
          <CardHeader className="pb-1">
            <div className="my-0 flex flex-row items-center">
              <CardTitle className="mb-0">
                <a
                  href={props.url}
                  className="text-xl font-semibold md:text-2xl flex flex-row items-center text-indigo-900 hover:text-pink-900" // Updated text color
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github
                    className="hidden md:block mr-2"
                    color="indigo"
                  />
                  {props.name}
                </a>
              </CardTitle>
            </div>
            <div className="flex flex-row items-center">
              {props.maintainerUsernames.map((username, index) => (
                <a
                  href={`https://www.github.com/${username}`}
                  key={username}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 hover:text-amber-100"
                >
                  <span
                    key={username}
                    className="text-sm"
                  >
                    @{username}
                    {index < props.maintainerUsernames.length - 1 && ', '}
                  </span>
                </a>
              ))}
            </div>
          </CardHeader>
          <CardDescription className="mt-0 ml-6 text-indigo-950">
            {props.description}
          </CardDescription>
          <div className="mx-6 mt-3 mb-5 flex flex-row flex-wrap items-center gap-2">
            {props.tech.map((techname) => (
              <Badge
                key={techname}
                variant="outline"
                className="flex items-center px-2 py-1 text-sm bg-[#5decffd3] border-white/30"
              >
                <img
                  className="mr-2"
                  src={`/icons/${techname.toLowerCase()}.svg`}
                  alt={techname}
                  width={16}
                  height={16}
                />
                <span className="text-indigo-600">{techname}</span>{' '}
                {/* Updated badge text color */}
              </Badge>
            ))}
          </div>
        </div>

        {/* The right arrow head */}
        <div className="mr-4 cursor-pointer rounded-full p-2 hover:bg-white/10">
          {' '}
          {/* Updated hover background */}
          <ChevronRight className="h-6 w-6 text-white" />{' '}
          {/* Updated icon color */}
        </div>
      </div>
    </Card>
  );
};

export default RepoCard;

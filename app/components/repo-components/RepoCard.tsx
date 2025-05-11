import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import type { ReposData } from '@/app/store/useRepositoryStore';
import { ChevronRight, Github } from 'lucide-react';
import React from 'react';

const RepoCard = (props: ReposData) => {
  return (
    <Card className="mb-4 border-2 border-[#535C91] shadow-md w-full">
      <div className="flex h-full flex-row items-center justify-between">
        <div>
          <CardHeader className="pb-1">
            <div className="my-0 flex flex-row items-center">
              <CardTitle className="mb-0">
                <a
                  href={props.url}
                  className="text-xl font-semibold md:text-2xl flex flex-row items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github
                    className="hidden md:block mr-2"
                    color="#227727"
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
                >
                  <span
                    key={username}
                    className="text-green-500 text-sm"
                  >
                    @{username}
                    {index < props.maintainerUsernames.length - 1 && ', '}
                  </span>
                </a>
              ))}
            </div>
          </CardHeader>
          <CardDescription className="mt-0 ml-6">
            {props.description}
          </CardDescription>
          <div className="mx-6 mt-3 mb-5 flex flex-row flex-wrap items-center gap-2">
            {props.tech.map((techname) => (
              <Badge
                key={techname}
                variant="outline"
                className="flex items-center px-2 py-1 text-sm bg-yellow-300/10"
              >
                <img
                  className="mr-2"
                  src={`/icons/${techname.toLowerCase()}.svg`}
                  alt={techname}
                  width={16}
                  height={16}
                />
                <span className="text-gray-600">{techname}</span>{' '}
              </Badge>
            ))}
          </div>
        </div>

        {/* The right arrow head */}
        <div className="mr-4 cursor-pointer rounded-full p-2 hover:bg-yellow-100">
          <ChevronRight className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

export default RepoCard;

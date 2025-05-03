import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import type { ReposData } from '@/app/store/useRepositoryStore';
import { ChevronRight } from 'lucide-react';
import React from 'react';

const RepoCard = (props: ReposData) => {
  return (
    <Card className="mb-4 border-2 border-[#535C91] shadow-md">
      <div className="flex h-full flex-row items-center justify-between">
        <div>
          <CardHeader className="pb-1">
            <div className="my-0 flex flex-row items-center">
              <CardTitle className="mb-0">
                <a
                  href={props.url}
                  className="font-semibold text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.name}
                </a>
              </CardTitle>
              <div className="mx-1 flex flex-row items-center rounded-md">
                {props.tech.map((techname) => (
                  <div
                    key={techname}
                    className="rounded-lg px-1 py-1 text-white text-xs"
                  >
                    <img
                      className="center"
                      key={techname}
                      src={`/icons/${techname.toLowerCase()}.svg`}
                      alt={techname}
                      width={30}
                      height={30}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
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
          <CardDescription className="mt-0 mb-6 ml-6">
            {props.description}
          </CardDescription>
        </div>

        {/* The right arrow head */}
        <div className="mr-4 cursor-pointer rounded-full p-2 hover:bg-blue-200">
          <ChevronRight className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

export default RepoCard;

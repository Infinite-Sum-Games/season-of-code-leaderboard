'use client';
import Image from 'next/image';
import { Card, CardDescription, CardHeader } from '../ui/card';

export interface ProjectCardProps {
  name: string;
  projectUrl: string;
  blurb: string;
  techstack: string[];
  maintainer: string[];
}

const ProjectCard = (props: ProjectCardProps) => {
  return (
    <Card
      className="bg-cover border-1 pb-4"
      style={{ backgroundImage: "url('cardBackground2.png')" }}
    >
      <div className="flex flex-col space-y-2">
        <CardHeader className="text-2xl sm:text-3xl text-[#ffffff] font-semibold pb-1">
          <a href={props.projectUrl} className="flex">
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={30}
              height={30}
              className="mr-4"
            />
            {props.name}
          </a>
        </CardHeader>

        {/* Commented out for "Coming soon" */}
        <div className="flex space-x-1 px-4">
          {props.techstack.map((tech, index) => (
            <div
              key={index}
              className="text-white text-xs pl-2 py-1 rounded-lg"
            >
              <Image
                className="center"
                key={index}
                src={`/icons/${tech.toLowerCase()}.svg`}
                alt={tech}
                width={30}
                height={30}
              />
            </div>
          ))}
        </div>

        <CardDescription className="text-1xl px-6 text-gray-300">
          {props.blurb}
        </CardDescription>

        {/* <CardDescription className="text-1xl px-6 text-gray-300">
          Details coming soon 🎉
        </CardDescription> */}

        {
          <div className="flex flex-row space-x-2 px-3 pt-4 items-center">
            <p className="text-base text-white px-3">Maintainers : </p>
            {props.maintainer.map((maintainer, index) => (
              <a
                key={index}
                href={`https://github.com/${maintainer}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mr-2"
              >
                <Image
                  src={`https://github.com/${maintainer}.png`}
                  alt={maintainer}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </a>
            ))}
          </div>
        }
      </div>
    </Card>
  );
};

export default ProjectCard;

import React from 'react';
import { TiArrowForward } from 'react-icons/ti';

interface CardProps {
  title: string;
  imageSrc: string;
  description: string;
  tags: string[];
  buttonText: string;
  onClick?: () => void;
}

export default function Card({
  title,
  imageSrc,
  description,
  tags,
  buttonText,
  onClick,
}: CardProps) {
  return (
    <div className="relative h-full w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-gray-300/30 bg-no-repeat" />

      <div className="relative z-10 flex h-full flex-col p-6">
        <div className="mb-4 flex h-16 items-center justify-center">
          <h3 className="line-clamp-2 overflow-hidden text-center font-bold text-2xl text-white">
            {title}
          </h3>
        </div>

        <div className="mx-auto mb-4 w-full overflow-hidden rounded-lg bg-gray-800">
          <img
            src={imageSrc}
            alt={title}
            className="h-40 w-full object-cover"
          />
        </div>

        {/* Fixed height description container */}
        <div className="mb-4 h-15 overflow-hidden">
          <p className="text-center text-sm text-white">{description}</p>
        </div>

        {/* Fixed height tags container */}
        <div className="mb-4 flex h-16 flex-wrap items-center justify-center gap-2 overflow-hidden">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-3 border-green-500 bg-white px-3 py-1 font-medium text-black text-sm"
            >
              <span className="mr-1 h-3 w-3 rounded-full bg-green-500" />
              {tag}
            </span>
          ))}
        </div>

        <div className="h-px w-full bg-white" />

        <button
          type="button"
          onClick={onClick}
          className="relative mt-4 flex w-full items-center justify-center rounded-lg border-2 border-white bg-gray-900 px-4 py-3 font-semibold text-3xl text-white transition-colors duration-300"
        >
          <span className="text-center">{buttonText}</span>
          <TiArrowForward
            size={30}
            className="absolute right-4 hidden md:block"
          />
        </button>
      </div>
    </div>
  );
}

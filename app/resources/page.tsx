'use client';
import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Card from '@/app/components/resources-components/resourceCard';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';
import Cloud from '../components/dashboard-components/Cloud';
import {
  Select,
  type SelectOption,
} from '@/app/components/resources-components/selector';
import { ScrollArea } from '@/app/components/ui/scroll-area';

const options = [
  { label: 'Rust', value: 2 },
  { label: 'GO', value: 3 },
  { label: 'JavaScript', value: 4 },
];

const allResources = [
  {
    title: 'Rust Guide',
    imageSrc: '/resourceCards/Rust-1.png',
    description: 'Learn Rust from beginner to advanced.',
    tags: ['Rust'],
    buttonText: 'Read More',
  },

  {
    title: 'BackEnd Guide',
    imageSrc: '/resourceCards/Rust-1.png',
    description: 'Learn Rust from beginner to advanced.',
    tags: ['JavaScript', 'GO'],
    buttonText: 'Read More',
  },
  {
    title: 'GO and Rust Guide',
    imageSrc: '/resourceCards/Rust-1.png',
    description: 'Learn Rust from beginner to advanced.',
    tags: ['GO', 'Rust'],
    buttonText: 'Read More',
  },
  {
    title: 'GO Guide',
    imageSrc: '/resourceCards/Rust-1.png',
    description: 'Learn Rust from beginner to advanced.',
    tags: ['GO'],
    buttonText: 'Read More',
  },
];

const ResourcePage = () => {
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);
  const selectedLabels = selectedTags.map((t) => t.label);
  const filteredResources =
    selectedTags.length === 0
      ? allResources
      : [
          ...allResources.filter((resource) =>
            selectedLabels.every((tag) => resource.tags.includes(tag)),
          ),
          ...allResources.filter(
            (resource) =>
              selectedLabels.some((tag) => resource.tags.includes(tag)) &&
              !selectedLabels.every((tag) => resource.tags.includes(tag)),
          ),
        ];
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      <SunGlareEffect />
      <Cloud />

      {/* Header */}
      <section className="mt-30 px-4 text-center">
        <h1 className="font-extrabold text-4xl text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] md:text-5xl">
          Explore Developer Resources
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-lg text-white/70 drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]">
          Find tools, guides, and libraries to boost your development journey.
        </p>

        {/* Dropdown */}
        <div className=" relative z-[100] mx-auto mt-0 flex max-w-3xl justify-center">
          <Select
            multiple
            options={options}
            value={selectedTags}
            onChange={(o) => setSelectedTags(o)}
          />
        </div>
      </section>
      {/* Cards Section with Scroll */}
      <section className="mx-auto max-w-screen-xl px-4 pb-8 sm:px-6 md:px-8">
        <ScrollArea className="h-[60vh] rounded-lg border-none">
          <div className="grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 sm:p-4 md:grid-cols-3">
            {filteredResources.map((card) => (
              <Card
                key={card.title}
                {...card}
              />
            ))}
          </div>
        </ScrollArea>
      </section>
    </div>
  );
};

export default ResourcePage;

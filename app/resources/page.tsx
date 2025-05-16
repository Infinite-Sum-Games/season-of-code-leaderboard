'use client';
import Navbar from '@/app/components/Navbar';
import Card from '@/app/components/resources-components/resourceCard';
import {
  Select,
  type SelectOption,
} from '@/app/components/resources-components/selector';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';

type Resource = {
  title: string;
  imageSrc: string;
  description: string;
  tags: string[];
  buttonText: string;
  url?: string;
};

const ResourcePage = () => {
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('resourceCards/resources.json');

        if (!response.ok) {
          throw new Error(`Failed to fetch resources: ${response.status}`);
        }

        const data = await response.json();
        setResources(data);

        // Generate unique tags from all resources
        const allTags = data.flatMap((resource: Resource) => resource.tags);
        const uniqueTags = [...new Set(allTags)].sort();

        // Create options array with unique tags
        const tagOptions = uniqueTags.map((tag, index) => ({
          label: String(tag),
          value: index + 1,
        }));

        setOptions(tagOptions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load resources',
        );
        console.error('Error loading resources:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Get an array of the selected tag labels
  const selectedLabels = selectedTags.map((t) => t.label);

  // Apply the prioritized filtering logic
  const filteredResources =
    selectedTags.length === 0
      ? resources
      : [
          // First show resources that match ALL selected tags
          ...resources.filter((resource) =>
            selectedLabels.every((tag) => resource.tags.includes(tag)),
          ),
          // Then show resources that match SOME but not ALL selected tags
          ...resources.filter(
            (resource) =>
              selectedLabels.some((tag) => resource.tags.includes(tag)) &&
              !selectedLabels.every((tag) => resource.tags.includes(tag)),
          ),
        ];

  return (
    <div className="relative h-screen overflow-hidden">
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
        <div className="relative z-[100] mx-auto mt-0 flex max-w-3xl justify-center">
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
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-white">Loading resources...</p>
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-white">
                No resources match your selected tags.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 sm:p-4 md:grid-cols-3">
              {filteredResources.map((card, index) => (
                <Card
                  key={`${card.title}-${index}`}
                  {...card}
                  onClick={
                    card.url ? () => window.open(card.url, '_blank') : undefined
                  }
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </section>
    </div>
  );
};

export default ResourcePage;

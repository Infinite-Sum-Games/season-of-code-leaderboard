'use client';
import {
  type IssuesData,
  tempRepos,
  useRepositoryStore,
} from '@/app/store/useRepositoryStore';
import { FilterIcon, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import IssueCard from '../components/repo-components/IssueCard';
import RepoCard from '../components/repo-components/RepoCard';
import { Button } from '../components/ui/button';

const ReposPage = () => {
  const setRepositories = useRepositoryStore((state) => state.setRepos);
  const repositories = useRepositoryStore((state) => state.repos);
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);

  useEffect(() => {
    setRepositories(tempRepos);
  }, [setRepositories]);

  const selectedRepo = repositories.find((repo) => repo.id === selectedRepoId);

  const handleRepoSelect = (repoId: string) => {
    setSelectedRepoId(repoId);
  };

  const clearSelection = () => {
    setSelectedRepoId(null);
  };

  return (
    <div className="container mx-auto mt-4 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-4xl text-white sm:text-6xl">
          Repositories & Issues
        </h1>
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between ">
          <p className="max-w-3xl text-gray-300 text-md">
            Explore repositories on the left. Select one to view its issues on
            the right.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 md:mt-0"
          >
            {/* TODO: setup filters */}
            <FilterIcon className="mr-1 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      {/* Two Panes */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Repo List */}
        <div className="w-full flex-shrink-0 md:w-1/2 lg:w-5/12">
          <h2 className="mb-3 border-gray-700 border-b pb-2 font-semibold text-2xl text-gray-200">
            Repositories ({repositories.length})
          </h2>
          <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-2">
            {' '}
            {/* Added scroll */}
            {repositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => handleRepoSelect(repo.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    handleRepoSelect(repo.id);
                  }
                }}
                className="cursor-pointer rounded-lg"
              >
                <RepoCard {...repo} />
              </div>
            ))}
            {repositories.length === 0 && (
              <p className="py-10 text-center text-gray-400">
                No repositories loaded.
              </p>
            )}
          </div>
        </div>

        {/* Issues List */}
        <div className="w-full md:w-1/2 lg:w-7/12">
          <div className="mb-3 flex items-center justify-between border-gray-700 border-b pb-2">
            <h2 className="font-semibold text-2xl text-gray-200">
              Issues
              {selectedRepo && (
                <span className="ml-2 text-gray-400 text-lg">
                  ({selectedRepo.name})
                </span>
              )}
            </h2>
            {selectedRepo && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="border-1 border-gray-500 text-gray-300 hover:text-red-500"
              >
                <XCircle className="mr-1 h-4 w-4" /> Clear
              </Button>
            )}
          </div>

          <div className="max-h-[70vh] overflow-y-auto pr-2">
            {selectedRepo ? (
              selectedRepo.Issues && selectedRepo.Issues.length > 0 ? (
                selectedRepo.Issues.map((issue: IssuesData) => (
                  <IssueCard
                    key={issue.id}
                    {...issue}
                  />
                ))
              ) : (
                <p className="py-10 text-center text-gray-400">
                  No issues found for this repository.
                </p>
              )
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border-2 border-gray-700 border-dashed">
                <p className="text-gray-500 text-sm sm:text-base">
                  Select a repository to view its issues
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReposPage;

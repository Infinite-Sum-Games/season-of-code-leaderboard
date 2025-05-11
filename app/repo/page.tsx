'use client';
import {
  type IssuesData,
  tempRepos,
  useRepositoryStore,
} from '@/app/store/useRepositoryStore';
import { cn } from '@/lib/utils';
import {
  CheckSquare,
  Code,
  Filter,
  GitBranch,
  Search,
  SortAsc,
  Tag,
  X,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import IssueCard from '../components/repo-components/IssueCard';
import RepoCard from '../components/repo-components/RepoCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Input } from '../components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';

type IssueFilterType = 'all' | 'claimed' | 'unclaimed' | 'completed' | 'active';
type IssueSortType = 'newest' | 'oldest' | 'bounty-high' | 'bounty-low';

const ReposPage = () => {
  const setRepositories = useRepositoryStore((state) => state.setRepos);
  const repositories = useRepositoryStore((state) => state.repos);
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'repositories' | 'issues'>(
    'repositories',
  );
  const [issueFilter, setIssueFilter] = useState<IssueFilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [issueSort, setIssueSort] = useState<IssueSortType>('newest');

  useEffect(() => {
    setRepositories(tempRepos);
  }, [setRepositories]);

  const selectedRepo = repositories.find((repo) => repo.id === selectedRepoId);

  const handleRepoSelect = (repoId: string) => {
    setSelectedRepoId(repoId);
    // For mobile view, switch to issues tab after selection
    if (window.innerWidth < 768) {
      setActiveTab('issues');
    }
  };

  const clearSelection = () => {
    setSelectedRepoId(null);
    if (window.innerWidth < 768) {
      setActiveTab('repositories');
    }
  };

  // Filter and sort issues - moved to useMemo for performance
  const filteredIssues = useMemo(() => {
    if (!selectedRepo?.Issues) return [];

    let filtered = [...selectedRepo.Issues];

    // Apply filters
    switch (issueFilter) {
      case 'claimed':
        filtered = filtered.filter((issue) => issue.isClaimed);
        break;
      case 'unclaimed':
        filtered = filtered.filter((issue) => !issue.isClaimed);
        break;
      case 'completed':
        filtered = filtered.filter((issue) => issue.completionStatus);
        break;
      case 'active':
        filtered = filtered.filter((issue) => !issue.completionStatus);
        break;
    }

    // Apply search
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (issue) =>
          issue.title.toLowerCase().includes(lowerSearchTerm) ||
          issue.language.some((lang) =>
            lang.toLowerCase().includes(lowerSearchTerm),
          ),
      );
    }

    // Apply sorting
    switch (issueSort) {
      case 'bounty-high':
        filtered.sort((a, b) => {
          const bountyA =
            a.multiplierActive && a.multiplierValue
              ? a.bounty * a.multiplierValue
              : a.bounty;
          const bountyB =
            b.multiplierActive && b.multiplierValue
              ? b.bounty * b.multiplierValue
              : b.bounty;
          return bountyB - bountyA;
        });
        break;
      case 'bounty-low':
        filtered.sort((a, b) => {
          const bountyA =
            a.multiplierActive && a.multiplierValue
              ? a.bounty * a.multiplierValue
              : a.bounty;
          const bountyB =
            b.multiplierActive && b.multiplierValue
              ? b.bounty * b.multiplierValue
              : b.bounty;
          return bountyA - bountyB;
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => a.id.localeCompare(b.id));
        break;
      default:
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return filtered;
  }, [selectedRepo, issueFilter, searchTerm, issueSort]);

  // Create filter badge text
  const filterBadgeText = useMemo(() => {
    switch (issueFilter) {
      case 'claimed':
        return 'Claimed';
      case 'unclaimed':
        return 'Unclaimed';
      case 'completed':
        return 'Completed';
      case 'active':
        return 'Active';
      default:
        return 'All';
    }
  }, [issueFilter]);

  // Create sort badge text
  const sortBadgeText = useMemo(() => {
    switch (issueSort) {
      case 'bounty-high':
        return 'Bounty: High to Low';
      case 'bounty-low':
        return 'Bounty: Low to High';
      case 'oldest':
        return 'Oldest First';
      case 'newest':
        return 'Newest First';
      default:
        return 'Newest';
    }
  }, [issueSort]);

  // Check if filters are applied
  const hasActiveFilters =
    issueFilter !== 'all' || searchTerm || issueSort !== 'newest';

  const resetFilters = () => {
    setIssueFilter('all');
    setSearchTerm('');
    setIssueSort('newest');
  };

  // Enhanced Filter and Sort Menu Components
  const FilterMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          type="button"
          className="border-gray-600 bg-gray-800 text-gray-200 hover:border-gray-500 hover:bg-gray-700"
        >
          <Filter className="mr-1 h-4 w-4 text-blue-400" />
          <span>Filter</span>
          {issueFilter !== 'all' && (
            <Badge className="ml-2 bg-blue-600 text-white">1</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-gray-600 bg-gray-800 text-gray-200">
        <DropdownMenuLabel className="text-gray-300">
          Filter Issues
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={() => setIssueFilter('all')}
          className={cn(
            'cursor-pointer hover:bg-gray-700',
            issueFilter === 'all' && 'bg-gray-700 font-medium',
          )}
        >
          <span className="text-gray-200">All Issues</span>
          {issueFilter === 'all' && (
            <CheckSquare className="ml-2 h-4 w-4 text-blue-400" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIssueFilter('claimed')}
          className={cn(
            'cursor-pointer hover:bg-gray-700',
            issueFilter === 'claimed' && 'bg-gray-700 font-medium',
          )}
        >
          <span className="text-green-300">Claimed</span>
          {issueFilter === 'claimed' && (
            <CheckSquare className="ml-2 h-4 w-4 text-blue-400" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIssueFilter('unclaimed')}
          className={cn(
            'cursor-pointer hover:bg-gray-700',
            issueFilter === 'unclaimed' && 'bg-gray-700 font-medium',
          )}
        >
          <span className="text-amber-300">Unclaimed</span>
          {issueFilter === 'unclaimed' && (
            <CheckSquare className="ml-2 h-4 w-4 text-blue-400" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIssueFilter('completed')}
          className={cn(
            'cursor-pointer hover:bg-gray-700',
            issueFilter === 'completed' && 'bg-gray-700 font-medium',
          )}
        >
          <span className="text-green-400">Completed</span>
          {issueFilter === 'completed' && (
            <CheckSquare className="ml-2 h-4 w-4 text-blue-400" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIssueFilter('active')}
          className={cn(
            'cursor-pointer hover:bg-gray-700',
            issueFilter === 'active' && 'bg-gray-700 font-medium',
          )}
        >
          <span className="text-blue-400">Active</span>
          {issueFilter === 'active' && (
            <CheckSquare className="ml-2 h-4 w-4 text-blue-400" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const SortMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          type="button"
          className="border-gray-600 bg-gray-800 text-gray-200 hover:border-gray-500 hover:bg-gray-700"
        >
          <SortAsc className="mr-1 h-4 w-4 text-purple-400" />
          <span>Sort</span>
          {issueSort !== 'newest' && (
            <Badge className="ml-2 bg-purple-600 text-white">1</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-gray-600 bg-gray-800 text-gray-200">
        <DropdownMenuLabel className="text-gray-300">
          Sort Issues
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={() => setIssueSort('newest')}
          className={cn(
            'cursor-pointer hover:bg-gray-700',
            issueSort === 'newest' && 'bg-gray-700 font-medium',
          )}
        >
          <span className="text-gray-200">Newest First</span>
          {issueSort === 'newest' && (
            <CheckSquare className="ml-2 h-4 w-4 text-purple-400" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIssueSort('oldest')}
          className={cn(
            'cursor-pointer hover:bg-gray-700',
            issueSort === 'oldest' && 'bg-gray-700 font-medium',
          )}
        >
          <span className="text-gray-200">Oldest First</span>
          {issueSort === 'oldest' && (
            <CheckSquare className="ml-2 h-4 w-4 text-purple-400" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIssueSort('bounty-high')}
          className={cn(
            'cursor-pointer hover:bg-gray-700',
            issueSort === 'bounty-high' && 'bg-gray-700 font-medium',
          )}
        >
          <span className="text-amber-300">Bounty: High to Low</span>
          {issueSort === 'bounty-high' && (
            <CheckSquare className="ml-2 h-4 w-4 text-purple-400" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIssueSort('bounty-low')}
          className={cn(
            'cursor-pointer hover:bg-gray-700',
            issueSort === 'bounty-low' && 'bg-gray-700 font-medium',
          )}
        >
          <span className="text-amber-300">Bounty: Low to High</span>
          {issueSort === 'bounty-low' && (
            <CheckSquare className="ml-2 h-4 w-4 text-purple-400" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Desktop view layout
  const desktopView = (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Repo List */}
      <div className="w-full flex-shrink-0 rounded-lg bg-gray-900 p-4 shadow-lg md:w-1/2 lg:w-5/12">
        <h2 className="mb-3 flex items-center border-gray-700 border-b pb-2 font-semibold text-2xl text-gray-200">
          <GitBranch className="mr-2 h-6 w-6 text-blue-400" />
          Repositories{' '}
          <span className="ml-2 text-blue-400">({repositories.length})</span>
        </h2>
        <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-3">
            {repositories.map((repo) => (
              <button
                type="button"
                key={repo.id}
                onClick={() => handleRepoSelect(repo.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    handleRepoSelect(repo.id);
                  }
                }}
                aria-pressed={selectedRepoId === repo.id}
                className={cn(
                  'cursor-pointer rounded-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md w-full',
                  selectedRepoId === repo.id
                    ? 'bg-gray-800 ring-2 ring-blue-500'
                    : 'hover:ring-1 hover:ring-blue-400',
                )}
              >
                <RepoCard {...repo} />
              </button>
            ))}
            {repositories.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <GitBranch className="mb-2 h-10 w-10 text-gray-500" />
                <p className="text-gray-400">No repositories loaded.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="w-full rounded-lg bg-gray-900 p-4 shadow-lg md:w-1/2 lg:w-7/12">
        <div className="mb-3 flex items-center justify-between border-gray-700 border-b pb-2">
          <h2 className="flex items-center font-semibold text-2xl text-gray-200">
            <Code className="mr-2 h-6 w-6 text-purple-400" />
            Issues
            {selectedRepo && (
              <span className="ml-2 text-lg text-purple-400">
                ({selectedRepo.name})
              </span>
            )}
          </h2>
          {selectedRepo && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={clearSelection}
              className="border border-gray-700 text-gray-300 transition-colors hover:bg-gray-800 hover:text-red-400"
            >
              <XCircle className="mr-1 h-4 w-4" /> Clear
            </Button>
          )}
        </div>

        {selectedRepo && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="relative max-w-md flex-grow">
              <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-700 bg-gray-800 pl-8 text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute top-2.5 right-2"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-gray-500 transition-colors hover:text-red-400" />
                </button>
              )}
            </div>

            <FilterMenu />
            <SortMenu />

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={resetFilters}
                className="border border-gray-700 text-gray-300 hover:text-red-400"
              >
                <X className="mr-1 h-4 w-4" /> Reset
              </Button>
            )}
          </div>
        )}

        {selectedRepo && hasActiveFilters && (
          <div className="mb-4 flex flex-wrap gap-2">
            {issueFilter !== 'all' && (
              <Badge
                variant="outline"
                className="border-blue-600 bg-gray-800 text-blue-300"
              >
                <Filter className="mr-1 h-3 w-3" /> {filterBadgeText}
              </Badge>
            )}
            {issueSort !== 'newest' && (
              <Badge
                variant="outline"
                className="border-purple-600 bg-gray-800 text-purple-300"
              >
                <SortAsc className="mr-1 h-3 w-3" /> {sortBadgeText}
              </Badge>
            )}
            {searchTerm && (
              <Badge
                variant="outline"
                className="border-green-600 bg-gray-800 text-green-300"
              >
                <Search className="mr-1 h-3 w-3" /> "{searchTerm}"
              </Badge>
            )}
          </div>
        )}

        <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 h-[calc(70vh-100px)] overflow-y-auto pr-2">
          {selectedRepo ? (
            filteredIssues.length > 0 ? (
              <div className="space-y-4">
                {filteredIssues.map((issue: IssuesData) => (
                  <div
                    key={issue.id}
                    className="transform transition-all duration-200 hover:translate-y-[-2px]"
                  >
                    <IssueCard {...issue} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Search className="mb-2 h-10 w-10 text-gray-500" />
                <p className="text-gray-400">
                  No issues found matching your criteria.
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="link"
                    type="button"
                    onClick={resetFilters}
                    className="mt-2 text-blue-400 hover:text-blue-300"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            )
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-gray-700 border-dashed bg-gray-800/50">
              <Code className="mb-2 h-8 w-8 text-gray-500" />
              <p className="text-gray-500 text-sm sm:text-base">
                Select a repository to view its issues
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile view layout using tabs
  const mobileView = (
    <Tabs
      value={activeTab}
      onValueChange={(value) =>
        setActiveTab(value as 'repositories' | 'issues')
      }
      className="md:hidden"
    >
      <TabsList className="grid w-full grid-cols-2 bg-gray-800 p-1">
        <TabsTrigger
          value="repositories"
          className={cn(
            'data-[state=active]:bg-gray-700 data-[state=active]:text-blue-400',
            'data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200',
          )}
        >
          <GitBranch className="mr-2 h-4 w-4" /> Repositories
        </TabsTrigger>
        <TabsTrigger
          value="issues"
          className={cn(
            'data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400',
            'data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200',
          )}
        >
          <Code className="mr-2 h-4 w-4" /> Issues
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="repositories"
        className="mt-4 rounded-lg bg-gray-900 p-4 shadow-lg"
      >
        <h2 className="mb-3 flex items-center border-gray-700 border-b pb-2 font-semibold text-2xl text-gray-200">
          <GitBranch className="mr-2 h-6 w-6 text-blue-400" />
          Repositories{' '}
          <span className="ml-2 text-blue-400">({repositories.length})</span>
        </h2>
        <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-3">
            {repositories.map((repo) => (
              <button
                type="button"
                key={repo.id}
                onClick={() => handleRepoSelect(repo.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    handleRepoSelect(repo.id);
                  }
                }}
                aria-pressed={selectedRepoId === repo.id}
                className={cn(
                  'cursor-pointer rounded-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md',
                  selectedRepoId === repo.id
                    ? 'bg-gray-800 ring-2 ring-blue-500'
                    : 'hover:ring-1 hover:ring-blue-400',
                )}
              >
                <RepoCard {...repo} />
              </button>
            ))}
            {repositories.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <GitBranch className="mb-2 h-10 w-10 text-gray-500" />
                <p className="text-gray-400">No repositories loaded.</p>
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="issues"
        className="mt-4 rounded-lg bg-gray-900 p-4 shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between border-gray-700 border-b pb-2">
          <h2 className="flex items-center font-semibold text-2xl text-gray-200">
            <Code className="mr-2 h-6 w-6 text-purple-400" />
            Issues
            {selectedRepo && (
              <span className="ml-2 text-lg text-purple-400">
                ({selectedRepo.name})
              </span>
            )}
          </h2>
          {selectedRepo && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={clearSelection}
              className="border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-red-400"
            >
              <XCircle className="mr-1 h-4 w-4" /> Clear
            </Button>
          )}
        </div>

        {selectedRepo && (
          <div className="mb-4 space-y-3">
            <div className="relative">
              <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-700 bg-gray-800 pl-8 text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute top-2.5 right-2"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-gray-500 transition-colors hover:text-red-400" />
                </button>
              )}
            </div>

            <div className="flex justify-between gap-2">
              <FilterMenu />
              <SortMenu />
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={resetFilters}
                  className="border border-gray-700 text-gray-300 hover:text-red-400"
                >
                  <X className="mr-1 h-4 w-4" /> Reset
                </Button>
              )}
            </div>
          </div>
        )}

        {selectedRepo && hasActiveFilters && (
          <div className="mb-4 flex flex-wrap gap-2">
            {issueFilter !== 'all' && (
              <Badge
                variant="outline"
                className="border-blue-600 bg-gray-800 text-blue-300"
              >
                <Filter className="mr-1 h-3 w-3" /> {filterBadgeText}
              </Badge>
            )}
            {issueSort !== 'newest' && (
              <Badge
                variant="outline"
                className="border-purple-600 bg-gray-800 text-purple-300"
              >
                <SortAsc className="mr-1 h-3 w-3" /> {sortBadgeText}
              </Badge>
            )}
            {searchTerm && (
              <Badge
                variant="outline"
                className="max-w-xs truncate border-green-600 bg-gray-800 text-green-300"
              >
                <Search className="mr-1 h-3 w-3" /> "{searchTerm}"
              </Badge>
            )}
          </div>
        )}

        <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 h-[calc(70vh-150px)] overflow-y-auto pr-2">
          {selectedRepo ? (
            filteredIssues.length > 0 ? (
              <div className="space-y-4">
                {filteredIssues.map((issue: IssuesData) => (
                  <div
                    key={issue.id}
                    className="transform transition-all duration-200 hover:translate-y-[-2px]"
                  >
                    <IssueCard {...issue} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Search className="mb-2 h-10 w-10 text-gray-500" />
                <p className="text-gray-400">
                  No issues found matching your criteria.
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="link"
                    type="button"
                    onClick={resetFilters}
                    className="mt-2 text-blue-400 hover:text-blue-300"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            )
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-gray-700 border-dashed bg-gray-800/50">
              <Code className="mb-2 h-8 w-8 text-gray-500" />
              <p className="text-gray-500 text-sm sm:text-base">
                Select a repository to view its issues
              </p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="container mx-auto mt-4 p-6">
      {/* Header Section with improved visuals */}
      <div className="mb-6 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 p-6 shadow-lg">
        <h1 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text font-bold text-4xl text-transparent sm:text-6xl">
          Repositories & Issues
        </h1>
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl text-gray-300 text-md">
            Explore repositories on the left. Select one to view its issues on
            the right.
          </p>
          <div className="mt-3 md:mt-0">
            <Badge className="bg-blue-600">Season of Code</Badge>
          </div>
        </div>
      </div>

      {/* Responsive Layout */}
      <div className="hidden md:block">{desktopView}</div>
      <div className="md:hidden">{mobileView}</div>
    </div>
  );
};

export default ReposPage;

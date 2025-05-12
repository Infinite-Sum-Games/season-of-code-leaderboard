import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import type { IssuesData } from '@/app/store/useRepositoryStore';
import { cn } from '@/lib/utils';
import { Code, ExternalLink, GitPullRequest, Star, Tag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const difficultyColorMap: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-800 border-emerald-400',
  Medium: 'bg-amber-100 text-amber-800 border-amber-400',
  Hard: 'bg-rose-100 text-rose-800 border-rose-400',
};

const IssueCard = (props: IssuesData) => {
  const {
    title,
    url,
    language,
    bounty,
    difficulty,
    isClaimed,
    claimedByList,
    multiplierActive,
    multiplierValue,
    completionStatus,
    PRsActive,
  } = props;

  const effectiveBounty =
    multiplierActive && multiplierValue
      ? Math.round(bounty * multiplierValue)
      : bounty;

  return (
    <Card
      className="mb-3 gradient-card bg-[#93B6F6] border border-white/30 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800 relative overflow-hidden"
      aria-label={`Issue: ${title} ${completionStatus ? '- Completed' : isClaimed ? '- Claimed' : '- Available'}`}
    >
      <div className="gradient-card-overlay absolute inset-0 z-0 opacity-30" />
      <div className="relative z-10">
        <CardHeader className="pt-3 pb-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
            <CardTitle className="group mb-0 flex items-center font-medium text-base">
              <span className="mr-1 line-clamp-2 text-indigo-900 dark:text-gray-100 transition-colors duration-200">
                {title}
              </span>
              <Link
                href={url}
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-indigo-900 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
                aria-label={`Open issue "${title}" in a new tab`}
              >
                <ExternalLink
                  className="h-3.5 w-3.5 transition-transform duration-200 hover:scale-110"
                  aria-hidden="true"
                />
              </Link>
            </CardTitle>
            <div className="flex flex-shrink-0 gap-1 mt-1 sm:mt-0">
              <Badge
                className={`${difficultyColorMap[difficulty] || 'border-gray-400 bg-gray-200 text-gray-900'} font-medium text-xs transition-all duration-200 hover:scale-105`}
                aria-label={`Difficulty: ${difficulty}`}
              >
                {difficulty}
              </Badge>
              {multiplierActive && multiplierValue && (
                <Badge
                  className="multiplier-badge text-xs"
                  aria-label={`Multiplier: ${multiplierValue}x`}
                >
                  <Star
                    className="mr-1 h-3 w-3"
                    aria-hidden="true"
                  />
                  {multiplierValue}x
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-2">
            <div
              className="flex flex-wrap gap-1"
              aria-label="Issue languages"
            >
              {language.map((lang) => (
                <Badge
                  key={lang}
                  variant="outline"
                  className="flex items-center px-2 py-0.5 text-xs bg-white/40 border-white/30 backdrop-blur-sm"
                >
                  <img
                    className="mr-1"
                    src={`/icons/${lang.toLowerCase()}.svg`}
                    alt={lang}
                    width={14}
                    height={14}
                  />
                  <span className="text-indigo-600">{lang}</span>
                </Badge>
              ))}
              {PRsActive > 0 && (
                <Badge
                  className="flex items-center px-2 py-0.5 text-xs bg-white/40 border-white/30 backdrop-blur-sm"
                  aria-label={`${PRsActive} Pull Request${PRsActive > 1 ? 's' : ''} active`}
                >
                  <GitPullRequest
                    className="mr-1 h-3 w-3 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span className="text-indigo-600">
                    {PRsActive} PR{PRsActive > 1 ? 's' : ''}
                  </span>
                </Badge>
              )}
            </div>

            <div className="sm:ml-auto flex flex-wrap items-center gap-2">
              <div
                className="flex items-center group"
                aria-label={`Bounty: ${effectiveBounty} points`}
              >
                <Tag
                  className={cn(
                    'mr-1 h-3.5 w-3.5 transition-colors duration-200',
                    multiplierActive ? 'text-indigo-900' : 'text-indigo-900',
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'font-semibold text-sm transition-all duration-200',
                    multiplierActive ? 'text-indigo-900' : 'text-indigo-900 ',
                  )}
                >
                  {effectiveBounty}
                </span>
                {multiplierActive &&
                  multiplierValue &&
                  bounty !== effectiveBounty && (
                    <span
                      className="ml-1 text-gray-700 text-xs line-through dark:text-gray-400"
                      aria-label={`Original bounty: ${bounty}`}
                    >
                      {bounty}
                    </span>
                  )}
              </div>

              {isClaimed ? (
                <Badge
                  className="bg-white/40 border-white/30 text-indigo-600 text-xs transition-all duration-200 backdrop-blur-sm"
                  aria-label={
                    claimedByList.length > 0
                      ? `Claimed by ${claimedByList[0]}`
                      : 'Claimed'
                  }
                >
                  <span className="flex items-center">
                    {claimedByList.length > 0 && (
                      <span className="mr-1 font-normal">
                        @{claimedByList[0]}
                      </span>
                    )}
                    <span className="font-medium">Claimed</span>
                  </span>
                </Badge>
              ) : (
                <Badge
                  className="bg-white/40 border-white/30 text-indigo-600 text-xs transition-all duration-200 backdrop-blur-sm"
                  aria-label="Issue is available"
                >
                  Available
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default IssueCard;

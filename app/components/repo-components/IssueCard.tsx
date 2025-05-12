import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import type { IssuesData } from '@/app/store/useRepositoryStore';
import {
  CheckCircle,
  Code,
  ExternalLink,
  FileCode,
  GitPullRequest,
  Star,
  Tag,
  X,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Enhanced difficulty color mapping with higher contrast for better accessibility
const difficultyColorMap: Record<string, string> = {
  Easy: 'bg-green-200 text-green-900 border-green-500',
  Medium: 'bg-yellow-200 text-yellow-900 border-yellow-500',
  Hard: 'bg-red-200 text-red-900 border-red-500',
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

  // Calculate effective bounty if multiplier is active
  const effectiveBounty =
    multiplierActive && multiplierValue
      ? Math.round(bounty * multiplierValue)
      : bounty;

  // Status-based styling with better contrast
  const cardBorderClass = completionStatus
    ? 'border-green-500'
    : isClaimed
      ? 'border-blue-500'
      : 'border-gray-400 hover:border-indigo-500';

  // Status text for screen readers
  const statusText = completionStatus
    ? 'Completed'
    : isClaimed
      ? 'Claimed'
      : 'Available';

  return (
    <Card
      className={`mb-4 border-2 ${cardBorderClass} bg-white shadow-md transition-all duration-200 dark:bg-gray-800`}
      aria-label={`Issue: ${title} - ${statusText}`}
    >
      <CardHeader className="pt-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="group mb-0 flex items-center font-medium text-lg">
            {completionStatus && (
              <CheckCircle
                className="mr-2 h-5 w-5 flex-shrink-0 text-green-600"
                aria-hidden="true"
              />
            )}
            <span className="mr-1 line-clamp-2 text-gray-900 dark:text-gray-100">
              {title}
            </span>
            <Link
              href={url}
              passHref
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-blue-700 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label={`Open issue "${title}" in a new tab`}
            >
              <ExternalLink
                className="h-4 w-4 group-hover:text-blue-500"
                aria-hidden="true"
              />
            </Link>
          </CardTitle>
          <div className="flex flex-shrink-0 gap-2">
            <Badge
              className={`${difficultyColorMap[difficulty] || 'border-gray-400 bg-gray-200 text-gray-900'} font-medium`}
              aria-label={`Difficulty: ${difficulty}`}
            >
              {difficulty}
            </Badge>
            {multiplierActive && multiplierValue && (
              <Badge
                className="border-purple-500 bg-purple-200 text-purple-900"
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

      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <div
            className="flex flex-wrap gap-2"
            aria-label="Issue languages"
          >
            {language.map((lang) => (
              <Badge
                key={lang}
                variant="outline"
                className="border-blue-400 bg-blue-100 text-blue-800 transition-colors hover:bg-blue-200"
              >
                <Code
                  className="mr-1 h-3 w-3"
                  aria-hidden="true"
                />
                {lang}
              </Badge>
            ))}
            {PRsActive > 0 && (
              <Badge
                className="border-blue-400 bg-blue-200 text-blue-900"
                aria-label={`${PRsActive} Pull Request${PRsActive > 1 ? 's' : ''} active`}
              >
                <GitPullRequest
                  className="mr-1 h-3 w-3"
                  aria-hidden="true"
                />
                {PRsActive} PR{PRsActive > 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div
              className="flex items-center"
              aria-label={`Bounty: ${effectiveBounty} points`}
            >
              <Tag
                className="mr-1 h-4 w-4 text-amber-700 dark:text-amber-400"
                aria-hidden="true"
              />
              <span
                className={'font-semibold text-amber-700 dark:text-amber-400'}
              >
                {effectiveBounty}
              </span>
              {multiplierActive &&
                multiplierValue &&
                bounty !== effectiveBounty && (
                  <span
                    className="ml-1 text-gray-600 text-xs line-through dark:text-gray-400"
                    aria-label={`Original bounty: ${bounty}`}
                  >
                    {bounty}
                  </span>
                )}
            </div>

            {isClaimed ? (
              <Badge
                className="border-blue-400 bg-blue-200 text-blue-900"
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
                className="border-green-400 bg-green-200 text-green-900"
                aria-label="Issue is available"
              >
                Available
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;

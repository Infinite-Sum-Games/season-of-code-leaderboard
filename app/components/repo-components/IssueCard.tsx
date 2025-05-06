import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { IssuesData } from '@/app/store/useRepositoryStore';
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
  const effectiveBounty = multiplierActive && multiplierValue
    ? Math.round(bounty * multiplierValue)
    : bounty;

  // Status-based styling with better contrast
  const cardBorderClass = completionStatus 
    ? 'border-green-500' 
    : isClaimed 
      ? 'border-blue-500'
      : 'border-gray-400 hover:border-indigo-500';

  return (
    <Card className={`mb-4 border-2 ${cardBorderClass} shadow-md transition-all duration-200 bg-white dark:bg-gray-800`}>
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-medium mb-0 flex items-center group">
            {completionStatus && (
              <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0" />
            )}
            <span className="mr-1 line-clamp-2 text-gray-900 dark:text-gray-100">{title}</span>
            <Link 
              href={url} 
              passHref 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 text-blue-700 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4 group-hover:text-blue-500" />
            </Link>
          </CardTitle>
          <div className="flex gap-2 flex-shrink-0">
            <Badge className={`${difficultyColorMap[difficulty] || 'bg-gray-200 text-gray-900 border-gray-400'} font-medium`}>
              {difficulty}
            </Badge>
            {multiplierActive && multiplierValue && (
              <Badge className="bg-purple-200 text-purple-900 border-purple-500">
                <Star className="w-3 h-3 mr-1" />
                {multiplierValue}x
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex justify-between items-center flex-wrap gap-y-2">
          <div className="flex gap-2 flex-wrap">
            {language.map((lang) => (
              <Badge 
                key={lang} 
                variant="outline" 
                className="bg-blue-100 text-blue-800 border-blue-400 hover:bg-blue-200 transition-colors"
              >
                <Code className="w-3 h-3 mr-1" />
                {lang}
              </Badge>
            ))}
            {PRsActive > 0 && (
              <Badge className="bg-blue-200 text-blue-900 border-blue-400">
                <GitPullRequest className="w-3 h-3 mr-1" />
                {PRsActive} PR{PRsActive > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1 text-amber-700 dark:text-amber-400" />
              <span className={`font-semibold text-amber-700 dark:text-amber-400`}>
                {effectiveBounty}
              </span>
              {multiplierActive && multiplierValue && bounty !== effectiveBounty && (
                <span className="text-xs text-gray-600 dark:text-gray-400 line-through ml-1">{bounty}</span>
              )}
            </div>
            
            {isClaimed ? (
              <Badge className="bg-blue-200 text-blue-900 border-blue-400">
                <span className="flex items-center">
                  {claimedByList.length > 0 && (
                    <span className="mr-1 font-normal">@{claimedByList[0]}</span>
                  )}
                  <span className="font-medium">Claimed</span>
                </span>
              </Badge>
            ) : (
              <Badge className="bg-green-200 text-green-900 border-green-400">
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
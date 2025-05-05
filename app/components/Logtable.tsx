'use client';

import { Bug, Sparkles, Sun, Trophy } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

type LogType = 'top3' | 'bounty' | 'issue';

interface LogEntry {
  id: string;
  type: LogType;
  user: string;
  timestamp: string;
  description: string;
}

const logs: LogEntry[] = [
  {
    id: '1',
    type: 'top3',
    user: 'Alice',
    timestamp: '2025-04-05T14:32:00Z',
    description: 'Alice just grabbed the #1 spot!',
  },
  {
    id: '2',
    type: 'bounty',
    user: 'Bob',
    timestamp: '2025-03-05T13:00:00Z',
    description: 'Bob received a 100 point bounty reward.',
  },
  {
    id: '3',
    type: 'issue',
    user: 'Charlie',
    timestamp: '2025-05-04T12:45:00Z',
    description: 'New issue "Optimize sorting algorithm" was created.',
  },
  {
    id: '4',
    type: 'bounty',
    user: 'Charlie',
    timestamp: '2025-06-04T12:45:00Z',
    description: 'Charlie received a 100 point bounty reward.',
  },
  {
    id: '5',
    type: 'issue',
    user: 'Charlie',
    timestamp: '2025-08-04T12:45:00Z',
    description: 'New issue "Responsive fix" was created.',
  },
  {
    id: '6',
    type: 'top3',
    user: 'User 6',
    timestamp: '2025-12-04T12:45:00Z',
    description: 'User 6 just grabbed the #3 spot!',
  },
  {
    id: '7',
    type: 'bounty',
    user: 'User 7',
    timestamp: '2025-11-04T12:45:00Z',
    description: 'User 7 received 100 bounty.',
  },
];

const typeStyles: Record<
  LogType,
  {
    label: string;
    color: string;
    Icon: React.FC<{ className?: string }>;
    bgColor: string;
  }
> = {
  top3: {
    label: 'Top 3',
    color: 'bg-yellow-400 text-white',
    Icon: Trophy,
    bgColor: 'bg-yellow-100',
  },
  bounty: {
    label: 'Bounty',
    color: 'bg-orange-400 text-white',
    Icon: Sparkles,
    bgColor: 'bg-orange-100',
  },
  issue: {
    label: 'Issue',
    color: 'bg-sky-500 text-white',
    Icon: Bug,
    bgColor: 'bg-sky-100',
  },
};

const formatDate = (isoDate: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(isoDate).toLocaleString('en-US', options);
};

export default function Logtable() {
  return (
    <TooltipProvider>
      <Card className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-100 via-white to-sky-100 shadow-lg">
        <CardContent className="p-4">
          <h2 className="mb-4 flex items-center gap-1 font-bold text-xl text-yellow-800">
            <Sun className="h-6 w-5 animate-spin" />
            Recent Logs
          </h2>

          <div className="max-h-64 w-full overflow-auto rounded-md border">
            <div className="min-w-[640px]">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow className="bg-yellow-50">
                    <TableHead className="w-1/6 px-4 text-yellow-900">
                      Type
                    </TableHead>
                    <TableHead className="w-1/6 text-yellow-900">
                      User
                    </TableHead>
                    <TableHead className="w-1/2 text-yellow-900">
                      Description
                    </TableHead>
                    <TableHead className="w-1/4 px-10 text-right text-yellow-900">
                      Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => {
                    const { label, color, Icon, bgColor } =
                      typeStyles[log.type];
                    return (
                      <TableRow
                        key={log.id}
                        className={`border-yellow-200 border-b transition hover:bg-yellow-50 hover:bg-opacity-75 ${bgColor}`}
                      >
                        <TableCell>
                          <Badge
                            className={`${color} flex items-center gap-1 rounded-full px-2 py-1`}
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-yellow-800">
                          {log.user}
                        </TableCell>
                        <TableCell className="truncate text-yellow-700">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-default">
                                {log.description}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              {log.description}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-right text-sm text-yellow-600">
                          {formatDate(log.timestamp)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

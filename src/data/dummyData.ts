export interface User {
  id: string;
  username: string;
  email: string;
  xp: number;
  rank: number;
  avatarUrl: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  status: 'completed' | 'pending' | 'unconfirmed';
  type: 'video' | 'repost' | 'attendance' | 'contribution' | 'hackathon' | 'bounty';
  submittedAt: string;
  completedAt?: string;
}

export const dummyUser: User = {
  id: '1',
  username: 'DevMaster',
  email: 'devmaster@example.com',
  xp: 2500,
  rank: 3,
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevMaster'
};

export const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'Complete React Tutorial Video',
    description: 'Watch and complete the basic React tutorial video series',
    xpReward: 100,
    status: 'completed',
    type: 'video',
    submittedAt: '2025-01-14T10:00:00Z',
    completedAt: '2025-01-14T15:00:00Z'
  },
  {
    id: '2',
    title: 'Share Project on Twitter',
    description: 'Share your completed project on Twitter with #DevStreak',
    xpReward: 50,
    status: 'unconfirmed',
    type: 'repost',
    submittedAt: '2025-01-15T09:00:00Z'
  },
  {
    id: '3',
    title: 'Weekly Team Meeting',
    description: 'Attend the weekly team sync meeting',
    xpReward: 30,
    status: 'completed',
    type: 'attendance',
    submittedAt: '2025-01-13T14:00:00Z',
    completedAt: '2025-01-13T15:00:00Z'
  },
  {
    id: '4',
    title: 'Open Source Contribution',
    description: 'Submit a PR to the project repository',
    xpReward: 200,
    status: 'unconfirmed',
    type: 'contribution',
    submittedAt: '2025-01-15T11:00:00Z'
  },
  {
    id: '5',
    title: 'Weekend Hackathon',
    description: 'Participate in the weekend hackathon event',
    xpReward: 500,
    status: 'pending',
    type: 'hackathon',
    submittedAt: '2025-01-16T00:00:00Z'
  },
  {
    id: '6',
    title: 'Bug Fix Bounty',
    description: 'Fix the reported critical bug in the authentication system',
    xpReward: 300,
    status: 'pending',
    type: 'bounty',
    submittedAt: '2025-01-15T16:00:00Z'
  }
];

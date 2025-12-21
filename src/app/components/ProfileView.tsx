import { User, Settings, Calendar, Award, History, TrendingUp, Flame, Target, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { StatsCard } from './StatsCard';
import type { User as UserType, ActivityLog } from '@/types';

interface ProfileViewProps {
  onLogout?: () => void;
}

/**
 * Mock Data for the user profile
 */
const MOCK_USER: UserType = {
  name: 'Axtra',
  avatar: 'https://github.com/shadcn.png',
  bio: 'Enthusiastic habit tracker and wellness advocate. Striving for 1% better every day.',
  joinDate: '2024-01-15',
  level: 12,
  totalPoints: 1250
};

/**
 * Mock Data for activity history
 */
const MOCK_HISTORY: ActivityLog[] = [
  { id: '1', action: 'Completed habit', habitName: 'Morning Jog', date: '2024-03-10T07:30:00' },
  { id: '2', action: 'Unlocked achievement', habitName: 'Early Bird', date: '2024-03-09T08:00:00' },
  { id: '3', action: 'Completed habit', habitName: 'Read 30 mins', date: '2024-03-09T20:00:00' },
  { id: '4', action: 'Completed habit', habitName: 'Drink Water', date: '2024-03-09T15:00:00' },
  { id: '5', action: 'Joined LifePulse', date: '2024-01-15T10:00:00' },
];

/**
 * ProfileView Component
 * 
 * Displays the user's profile information, statistics overview, and activity history.
 * Uses mock data for demonstration purposes.
 * 
 * @returns {JSX.Element} The rendered profile view
 */
export function ProfileView({ onLogout }: ProfileViewProps) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/10">
              <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
              <AvatarFallback>{MOCK_USER.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start">
                <h2 className="text-2xl font-bold">{MOCK_USER.name}</h2>
                <Badge variant="secondary" className="px-3 py-1">Level {MOCK_USER.level}</Badge>
              </div>
              <p className="text-muted-foreground max-w-lg">{MOCK_USER.bio}</p>
              <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground pt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(MOCK_USER.joinDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {MOCK_USER.totalPoints} Points
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Edit Profile
              </Button>
              {onLogout && (
                <Button variant="outline" className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={onLogout}>
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Habits"
          value="450"
          icon={TrendingUp}
          description="All time completions"
          variant="primary"
        />
        <StatsCard
          title="Current Streak"
          value="30 Days"
          icon={Flame}
          description="Personal best!"
        />
         <StatsCard
          title="Consistency"
          value="85%"
          icon={Target}
          description="Last 30 days"
          variant="secondary"
        />
      </div>

      {/* Activity History */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Activity History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {MOCK_HISTORY.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.action}</p>
                      {item.habitName && (
                        <p className="text-sm text-muted-foreground">{item.habitName}</p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </div>
                  {index < MOCK_HISTORY.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target, Flame, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import type { Achievement } from '@/types';

/**
 * Mock Data for achievements
 */
const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Complete 5 morning habits before 8 AM',
    icon: Zap,
    unlocked: true,
    progress: 5,
    maxProgress: 5,
    unlockedAt: '2024-03-09T08:00:00'
  },
  {
    id: '2',
    title: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: Flame,
    unlocked: true,
    progress: 7,
    maxProgress: 7,
    unlockedAt: '2024-02-20T10:00:00'
  },
  {
    id: '3',
    title: 'Wellness Warrior',
    description: 'Complete 50 total habits',
    icon: Target,
    unlocked: false,
    progress: 35,
    maxProgress: 50
  },
  {
    id: '4',
    title: 'Night Owl',
    description: 'Complete a habit after 10 PM',
    icon: Star,
    unlocked: false,
    progress: 0,
    maxProgress: 1
  }
];

/**
 * AchievementsView Component
 * 
 * Displays the user's achievements, level progress, and unlocked status.
 * Features animations for the cards using framer-motion.
 * 
 * @returns {JSX.Element} The rendered achievements view
 */
export function AchievementsView() {
  const unlockedCount = MOCK_ACHIEVEMENTS.filter(a => a.unlocked).length;
  const totalCount = MOCK_ACHIEVEMENTS.length;
  // const progressPercentage = (unlockedCount / totalCount) * 100; // Unused variable

  return (
    <div className="space-y-8">
      {/* Level Progress */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-emerald-500" />
                Level 5
              </h2>
              <p className="text-muted-foreground">1250 XP / 2000 XP</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-emerald-600">{unlockedCount} of {totalCount} Unlocked</p>
            </div>
          </div>
          <Progress value={62.5} className="h-3" />
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_ACHIEVEMENTS.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className={`h-full transition-colors ${achievement.unlocked ? 'border-emerald-500/50 bg-emerald-500/5' : 'opacity-75'}`}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-emerald-500/20 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {achievement.unlocked ? (
                    <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Unlocked</Badge>
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-2">{achievement.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">
                    {achievement.description}
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{achievement.progress} / {achievement.maxProgress}</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

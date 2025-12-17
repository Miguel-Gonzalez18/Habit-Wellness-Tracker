import { Card } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  description,
  variant = 'default'
}: StatsCardProps) {
  const variantStyles = {
    default: 'bg-card border-border',
    primary: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0',
    secondary: 'bg-gradient-to-br from-violet-500 to-violet-600 text-white border-0'
  };

  const iconStyles = {
    default: 'bg-primary/10 text-primary',
    primary: 'bg-white/20 text-white',
    secondary: 'bg-white/20 text-white'
  };

  return (
    <Card className={`p-6 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${variant === 'default' ? 'text-muted-foreground' : 'text-white/80'}`}>
            {title}
          </p>
          <h2 className="mt-2">{value}</h2>
          {description && (
            <p className={`text-xs mt-1 ${variant === 'default' ? 'text-muted-foreground' : 'text-white/70'}`}>
              {description}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}

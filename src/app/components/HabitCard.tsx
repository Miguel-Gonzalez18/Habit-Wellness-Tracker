import { Check, Circle, Flame, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface HabitCardProps {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ 
  id, 
  name, 
  icon, 
  completed, 
  streak, 
  onToggle, 
  onEdit, 
  onDelete 
}: HabitCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => onToggle(id)}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              completed 
                ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                : 'border-2 border-gray-300 hover:border-primary'
            }`}
          >
            {completed ? (
              <Check className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <h3 className={`transition-colors ${
                completed ? 'text-muted-foreground line-through' : 'text-foreground'
              }`}>
                {name}
              </h3>
            </div>
            
            {streak > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">
                  {streak} {streak === 1 ? 'día' : 'días'} de racha
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(id)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
import { useState, useEffect } from 'react';
import { User, Settings, Calendar, Award, History, TrendingUp, Flame, Target, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { StatsCard } from './StatsCard';
import { ProfileEditDialog } from './ProfileEditDialog';
import { toast } from 'sonner';
import type { User as UserType, ActivityLog } from '@/types';

interface ProfileViewProps {
  onLogout?: () => void;
}

/**
 * Mock Data for the user profile (Initial State)
 */
const DEFAULT_USER: UserType = {
  name: 'Axtra',
  avatar: 'https://github.com/shadcn.png',
  bio: 'Entusiasta del seguimiento de hábitos y el bienestar. Buscando mejorar un 1% cada día.',
  joinDate: '2024-01-15',
  level: 12,
  totalPoints: 1250
};

/**
 * Mock Data for activity history
 */
const MOCK_HISTORY: ActivityLog[] = [
  { id: '1', action: 'Hábito completado', habitName: 'Correr por la mañana', date: '2024-03-10T07:30:00' },
  { id: '2', action: 'Logro desbloqueado', habitName: 'Madrugador', date: '2024-03-09T08:00:00' },
  { id: '3', action: 'Hábito completado', habitName: 'Leer 30 mins', date: '2024-03-09T20:00:00' },
  { id: '4', action: 'Hábito completado', habitName: 'Beber agua', date: '2024-03-09T15:00:00' },
  { id: '5', action: 'Se unió a LifePulse', date: '2024-01-15T10:00:00' },
];

/**
 * ProfileView Component
 * 
 * Displays the user's profile information, statistics overview, and activity history.
 * Allows editing profile information and logging out.
 * 
 * @returns {JSX.Element} The rendered profile view
 */
export function ProfileView({ onLogout }: ProfileViewProps) {
  const [user, setUser] = useState<UserType>(DEFAULT_USER);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Merge with default user to ensure all fields exist
      setUser(prev => ({
        ...prev,
        ...parsedUser
      }));
    }
  }, []);

  const handleSaveProfile = (data: { name: string; bio: string; avatar: string }) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    // Update localStorage
    const storedUserStr = localStorage.getItem('currentUser');
    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : {};
    localStorage.setItem('currentUser', JSON.stringify({ ...storedUser, ...data }));
    
    toast.success('Perfil actualizado correctamente');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <Badge variant="secondary" className="px-3 py-1">Nivel {user.level}</Badge>
              </div>
              <p className="text-muted-foreground max-w-lg">{user.bio}</p>
              <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground pt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Unido el {new Date(user.joinDate).toLocaleDateString('es-ES')}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {user.totalPoints} Puntos
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="gap-2" onClick={() => setIsEditDialogOpen(true)}>
                <Settings className="w-4 h-4" />
                Editar Perfil
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
          title="Total de Hábitos"
          value="450"
          icon={TrendingUp}
          description="Completados totales"
          variant="primary"
        />
        <StatsCard
          title="Racha Actual"
          value="30 Días"
          icon={Flame}
          description="¡Mejor registro!"
        />
         <StatsCard
          title="Consistencia"
          value="85%"
          icon={Target}
          description="Últimos 30 días"
          variant="secondary"
        />
      </div>

      {/* Activity History */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Historial de Actividad
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
                      {new Date(item.date).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                  {index < MOCK_HISTORY.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <ProfileEditDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        onSave={handleSaveProfile} 
        currentUser={user} 
      />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HabitCard } from './components/HabitCard';
import { StatsCard } from './components/StatsCard';
import { HabitDialog } from './components/HabitDialog';
import { StatsView } from './components/StatsView';
import { AchievementsView } from './components/AchievementsView';
import { ProfileView } from './components/ProfileView';
import { AuthView } from './components/auth/AuthView';
import { Button } from './components/ui/button';
import { Plus, Target, Flame, Trophy, Calendar, User, TrendingUp, Search, Filter } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Habit } from '@/types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFrequency, setFilterFrequency] = useState('all');
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Ejercicio matutino', icon: '🏃', completed: false, streak: 5, frequency: 'daily', reminderTime: '07:00' },
    { id: '2', name: 'Meditar 10 minutos', icon: '🧘', completed: true, streak: 12, frequency: 'daily', reminderTime: '08:00' },
    { id: '3', name: 'Leer 30 páginas', icon: '📚', completed: false, streak: 8, frequency: 'daily', reminderTime: '19:00' },
    { id: '4', name: 'Beber 2L de agua', icon: '💧', completed: true, streak: 15, frequency: 'daily', reminderTime: '09:00' },
    { id: '5', name: 'Dormir 8 horas', icon: '😴', completed: false, streak: 3, frequency: 'daily', reminderTime: '22:00' },
  ]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    toast.info('Sesión cerrada correctamente');
  };

  if (!isAuthenticated) {
    return (
      <>
        <AuthView onLogin={handleLogin} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  const handleToggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
    
    const habit = habits.find(h => h.id === id);
    if (habit) {
      toast.success(
        habit.completed 
          ? `${habit.name} marcado como pendiente` 
          : `¡Excelente! ${habit.name} completado`
      );
    }
  };

  const handleEditHabit = (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      setEditingHabit(habit);
      setDialogOpen(true);
    }
  };

  const handleDeleteHabit = (id: string) => {
    const habit = habits.find(h => h.id === id);
    setHabits(habits.filter(h => h.id !== id));
    toast.success(`${habit?.name} eliminado`);
  };

  const handleSaveHabit = (data: { name: string; icon: string; frequency: string; reminderTime: string }) => {
    if (editingHabit) {
      // Editar hábito existente
      setHabits(habits.map(h => 
        h.id === editingHabit.id 
          ? { ...h, ...data }
          : h
      ));
      toast.success(`${data.name} actualizado`);
    } else {
      // Crear nuevo hábito
      const newHabit: Habit = {
        id: Date.now().toString(),
        ...data,
        completed: false,
        streak: 0,
      };
      setHabits([...habits, newHabit]);
      toast.success(`${data.name} creado exitosamente`);
    }
    setEditingHabit(null);
  };

  const handleOpenDialog = () => {
    setEditingHabit(null);
    setDialogOpen(true);
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedToday / totalHabits) * 100);
  const currentStreak = Math.max(...habits.map(h => h.streak));
  const totalPoints = habits.reduce((sum, h) => sum + (h.completed ? 10 : 0), 0) + 450;

  // Filtrar hábitos
  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFrequency = filterFrequency === 'all' || habit.frequency === filterFrequency;
    return matchesSearch && matchesFrequency;
  });

  const dailyHabits = filteredHabits.filter(h => h.frequency === 'daily');
  const weeklyHabits = filteredHabits.filter(h => h.frequency === 'weekly');

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1>Hola, Usuario 👋</h1>
              <p className="text-muted-foreground mt-1">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Progreso de Hoy"
                value={`${completedToday}/${totalHabits}`}
                icon={Target}
                description={`${completionRate}% completado`}
                variant="primary"
              />
              <StatsCard
                title="Racha Actual"
                value={`${currentStreak} días`}
                icon={Flame}
                description="¡Sigue así!"
              />
              <StatsCard
                title="Puntos Totales"
                value={totalPoints}
                icon={Trophy}
                description="Nivel 5"
                variant="secondary"
              />
              <StatsCard
                title="Este Mes"
                value="23/31"
                icon={Calendar}
                description="74% de días activos"
              />
            </div>

            {/* Habits Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2>Tus Hábitos de Hoy</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Completa tus hábitos diarios para mantener tu racha
                  </p>
                </div>
                <Button className="gap-2" onClick={handleOpenDialog}>
                  <Plus className="w-4 h-4" />
                  Nuevo Hábito
                </Button>
              </div>

              <div className="space-y-3">
                {habits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    {...habit}
                    onToggle={handleToggleHabit}
                    onEdit={handleEditHabit}
                    onDelete={handleDeleteHabit}
                  />
                ))}
              </div>

              {habits.length === 0 && (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3>No tienes hábitos aún</h3>
                  <p className="text-muted-foreground mt-2 mb-4">
                    Comienza tu viaje creando tu primer hábito
                  </p>
                  <Button className="gap-2" onClick={handleOpenDialog}>
                    <Plus className="w-4 h-4" />
                    Crear Primer Hábito
                  </Button>
                </div>
              )}
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
              <p className="text-lg opacity-90">
                "El éxito es la suma de pequeños esfuerzos repetidos día tras día."
              </p>
              <p className="text-sm opacity-75 mt-2">— Robert Collier</p>
            </div>
          </div>
        )}

        {activeTab === 'habits' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1>Gestión de Hábitos</h1>
                <p className="text-muted-foreground mt-1">
                  Administra todos tus hábitos en un solo lugar
                </p>
              </div>
              <Button className="gap-2 w-full sm:w-auto" onClick={handleOpenDialog}>
                <Plus className="w-4 h-4" />
                Nuevo Hábito
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar hábitos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterFrequency} onValueChange={setFilterFrequency}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="daily">Diarios</SelectItem>
                  <SelectItem value="weekly">Semanales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Target className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{totalHabits}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{dailyHabits.length}</p>
                    <p className="text-sm text-muted-foreground">Diarios</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Flame className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{completedToday}</p>
                    <p className="text-sm text-muted-foreground">Completados</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Trophy className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{completionRate}%</p>
                    <p className="text-sm text-muted-foreground">Tasa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Habits List */}
            {filteredHabits.length > 0 ? (
              <div className="space-y-6">
                {dailyHabits.length > 0 && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-500" />
                      Hábitos Diarios
                      <span className="text-sm text-muted-foreground">({dailyHabits.length})</span>
                    </h3>
                    <div className="space-y-3">
                      {dailyHabits.map((habit) => (
                        <HabitCard
                          key={habit.id}
                          {...habit}
                          onToggle={handleToggleHabit}
                          onEdit={handleEditHabit}
                          onDelete={handleDeleteHabit}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {weeklyHabits.length > 0 && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      Hábitos Semanales
                      <span className="text-sm text-muted-foreground">({weeklyHabits.length})</span>
                    </h3>
                    <div className="space-y-3">
                      {weeklyHabits.map((habit) => (
                        <HabitCard
                          key={habit.id}
                          {...habit}
                          onToggle={handleToggleHabit}
                          onEdit={handleEditHabit}
                          onDelete={handleDeleteHabit}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                {searchQuery || filterFrequency !== 'all' ? (
                  <>
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3>No se encontraron hábitos</h3>
                    <p className="text-muted-foreground mt-2 mb-4">
                      Intenta ajustar tus filtros de búsqueda
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setFilterFrequency('all');
                      }}
                    >
                      Limpiar filtros
                    </Button>
                  </>
                ) : (
                  <>
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3>No tienes hábitos aún</h3>
                    <p className="text-muted-foreground mt-2 mb-4">
                      Comienza tu viaje creando tu primer hábito
                    </p>
                    <Button className="gap-2" onClick={handleOpenDialog}>
                      <Plus className="w-4 h-4" />
                      Crear Primer Hábito
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <StatsView />
        )}

        {activeTab === 'achievements' && (
          <AchievementsView />
        )}

        {activeTab === 'profile' && (
          <ProfileView onLogout={handleLogout} />
        )}
      </main>

      <Toaster position="top-center" richColors />
      <HabitDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveHabit}
        editData={editingHabit}
      />
    </div>
  );
}

export default App;
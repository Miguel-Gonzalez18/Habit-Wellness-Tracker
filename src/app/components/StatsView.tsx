import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar, TrendingUp, Flame, Trophy, Target, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

// Datos simulados para progreso diario (últimos 30 días)
const dailyProgressData = [
  { date: '15 Nov', completados: 3, total: 5, porcentaje: 60 },
  { date: '16 Nov', completados: 4, total: 5, porcentaje: 80 },
  { date: '17 Nov', completados: 5, total: 5, porcentaje: 100 },
  { date: '18 Nov', completados: 2, total: 5, porcentaje: 40 },
  { date: '19 Nov', completados: 4, total: 5, porcentaje: 80 },
  { date: '20 Nov', completados: 5, total: 5, porcentaje: 100 },
  { date: '21 Nov', completados: 3, total: 5, porcentaje: 60 },
  { date: '22 Nov', completados: 4, total: 5, porcentaje: 80 },
  { date: '23 Nov', completados: 5, total: 5, porcentaje: 100 },
  { date: '24 Nov', completados: 5, total: 5, porcentaje: 100 },
  { date: '25 Nov', completados: 4, total: 5, porcentaje: 80 },
  { date: '26 Nov', completados: 3, total: 5, porcentaje: 60 },
  { date: '27 Nov', completados: 5, total: 5, porcentaje: 100 },
  { date: '28 Nov', completados: 4, total: 5, porcentaje: 80 },
  { date: '29 Nov', completados: 5, total: 5, porcentaje: 100 },
  { date: '30 Nov', completados: 5, total: 5, porcentaje: 100 },
  { date: '1 Dic', completados: 4, total: 5, porcentaje: 80 },
  { date: '2 Dic', completados: 3, total: 5, porcentaje: 60 },
  { date: '3 Dic', completados: 5, total: 5, porcentaje: 100 },
  { date: '4 Dic', completados: 4, total: 5, porcentaje: 80 },
  { date: '5 Dic', completados: 5, total: 5, porcentaje: 100 },
  { date: '6 Dic', completados: 5, total: 5, porcentaje: 100 },
  { date: '7 Dic', completados: 4, total: 5, porcentaje: 80 },
  { date: '8 Dic', completados: 5, total: 5, porcentaje: 100 },
  { date: '9 Dic', completados: 3, total: 5, porcentaje: 60 },
  { date: '10 Dic', completados: 4, total: 5, porcentaje: 80 },
  { date: '11 Dic', completados: 5, total: 5, porcentaje: 100 },
  { date: '12 Dic', completados: 5, total: 5, porcentaje: 100 },
  { date: '13 Dic', completados: 4, total: 5, porcentaje: 80 },
  { date: '14 Dic', completados: 3, total: 5, porcentaje: 60 },
];

// Datos para comparación de hábitos
const habitComparisonData = [
  { habito: 'Ejercicio', completados: 25, total: 30, tasa: 83 },
  { habito: 'Meditar', completados: 28, total: 30, tasa: 93 },
  { habito: 'Leer', completados: 22, total: 30, tasa: 73 },
  { habito: 'Agua', completados: 27, total: 30, tasa: 90 },
  { habito: 'Dormir', completados: 20, total: 30, tasa: 67 },
];

// Datos para distribución por categoría
const categoryDistributionData = [
  { name: 'Salud', value: 35, color: '#10B981' },
  { name: 'Productividad', value: 25, color: '#8B5CF6' },
  { name: 'Bienestar', value: 20, color: '#3B82F6' },
  { name: 'Ejercicio', value: 15, color: '#F59E0B' },
  { name: 'Otros', value: 5, color: '#6B7280' },
];

// Datos semanales
const weeklyData = [
  { dia: 'Lun', completados: 4, objetivo: 5 },
  { dia: 'Mar', completados: 5, objetivo: 5 },
  { dia: 'Mié', completados: 3, objetivo: 5 },
  { dia: 'Jue', completados: 5, objetivo: 5 },
  { dia: 'Vie', completados: 4, objetivo: 5 },
  { dia: 'Sáb', completados: 3, objetivo: 5 },
  { dia: 'Dom', completados: 4, objetivo: 5 },
];

export function StatsView() {
  const [timeRange, setTimeRange] = useState('30');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Estadísticas y Progreso</h1>
          <p className="text-muted-foreground mt-1">
            Analiza tu rendimiento y mejora continuamente
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 días</SelectItem>
            <SelectItem value="30">Últimos 30 días</SelectItem>
            <SelectItem value="90">Últimos 90 días</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Resumen de métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Target className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-xs text-emerald-500 font-medium">+12%</span>
          </div>
          <p className="text-2xl font-semibold">83%</p>
          <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Flame className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-xs text-purple-500 font-medium">🔥</span>
          </div>
          <p className="text-2xl font-semibold">15</p>
          <p className="text-sm text-muted-foreground">Racha Máxima</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Trophy className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-blue-500 font-medium">Nivel 5</span>
          </div>
          <p className="text-2xl font-semibold">128</p>
          <p className="text-sm text-muted-foreground">Hábitos Completados</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Calendar className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-xs text-amber-500 font-medium">74%</span>
          </div>
          <p className="text-2xl font-semibold">23/31</p>
          <p className="text-sm text-muted-foreground">Días Activos</p>
        </div>
      </div>

      {/* Gráfico de progreso diario */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Progreso Diario
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Tu tasa de completado en los últimos 30 días
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dailyProgressData}>
            <defs>
              <linearGradient id="colorPorcentaje" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Area 
              type="monotone" 
              dataKey="porcentaje" 
              stroke="#10B981" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPorcentaje)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparación de hábitos */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Rendimiento por Hábito
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Comparación de tasa de completado
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={habitComparisonData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="habito" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="tasa" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Distribución por categoría */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" />
              Distribución por Categoría
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Cómo distribuyes tu tiempo
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryDistributionData.map((category) => (
              <div key={category.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {category.name} ({category.value}%)
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Progreso semanal */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-6">
            <h3 className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              Progreso de Esta Semana
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Hábitos completados vs. objetivo diario
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="dia" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="completados" fill="#10B981" name="Completados" radius={[8, 8, 0, 0]} />
              <Bar dataKey="objetivo" fill="#E5E7EB" name="Objetivo" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Insights y recomendaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3>¡Excelente Progreso!</h3>
          </div>
          <p className="opacity-90">
            Has mejorado un 12% en comparación al mes anterior. Sigue así y alcanzarás tus metas.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Flame className="w-6 h-6" />
            </div>
            <h3>Racha Impresionante</h3>
          </div>
          <p className="opacity-90">
            Tu racha actual de 15 días es tu mejor marca personal. ¡No la pierdas!
          </p>
        </div>
      </div>
    </div>
  );
}

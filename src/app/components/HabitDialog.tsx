import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface HabitFormData {
  name: string;
  icon: string;
  frequency: string;
  reminderTime: string;
}

interface HabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: HabitFormData) => void;
  editData?: HabitFormData | null;
}

const emojiOptions = [
  { value: '🏃', label: '🏃 Ejercicio' },
  { value: '🧘', label: '🧘 Meditación' },
  { value: '📚', label: '📚 Lectura' },
  { value: '💧', label: '💧 Hidratación' },
  { value: '😴', label: '😴 Sueño' },
  { value: '🥗', label: '🥗 Alimentación' },
  { value: '💪', label: '💪 Gimnasio' },
  { value: '🎨', label: '🎨 Arte' },
  { value: '✍️', label: '✍️ Escritura' },
  { value: '🎵', label: '🎵 Música' },
  { value: '🌱', label: '🌱 Crecimiento' },
  { value: '🎯', label: '🎯 Objetivo' },
];

export function HabitDialog({ open, onOpenChange, onSave, editData }: HabitDialogProps) {
  const [selectedIcon, setSelectedIcon] = useState('🎯');
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<HabitFormData>({
    defaultValues: {
      name: '',
      frequency: 'daily',
      reminderTime: '09:00',
    }
  });

  useEffect(() => {
    if (editData) {
      setValue('name', editData.name);
      setValue('frequency', editData.frequency);
      setValue('reminderTime', editData.reminderTime);
      setSelectedIcon(editData.icon);
    } else {
      reset();
      setSelectedIcon('🎯');
    }
  }, [editData, reset, setValue]);

  const onSubmit = (data: HabitFormData) => {
    onSave({
      ...data,
      icon: selectedIcon,
    });
    reset();
    setSelectedIcon('🎯');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editData ? 'Editar Hábito' : 'Crear Nuevo Hábito'}
          </DialogTitle>
          <DialogDescription>
            {editData 
              ? 'Actualiza la información de tu hábito' 
              : 'Define un nuevo hábito para mejorar tu rutina diaria'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Hábito</Label>
            <Input
              id="name"
              placeholder="Ej: Ejercicio matutino"
              {...register('name', { 
                required: 'El nombre es requerido',
                minLength: { value: 3, message: 'Mínimo 3 caracteres' }
              })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Icono</Label>
            <div className="grid grid-cols-6 gap-2">
              {emojiOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedIcon(option.value)}
                  className={`text-3xl p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                    selectedIcon === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  {option.value}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frecuencia</Label>
            <Select
              defaultValue="daily"
              onValueChange={(value) => setValue('frequency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar frecuencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Diario</SelectItem>
                <SelectItem value="weekdays">Días de semana</SelectItem>
                <SelectItem value="weekends">Fines de semana</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminderTime">Hora de Recordatorio</Label>
            <Input
              id="reminderTime"
              type="time"
              {...register('reminderTime')}
            />
            <p className="text-xs text-muted-foreground">
              Recibirás una notificación a esta hora para completar tu hábito
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {editData ? 'Guardar Cambios' : 'Crear Hábito'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

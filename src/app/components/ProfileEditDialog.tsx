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
import { Textarea } from './ui/textarea';
import type { User } from '@/types';

interface ProfileFormData {
  name: string;
  bio: string;
  avatar: string;
}

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ProfileFormData) => void;
  currentUser: User;
}

export function ProfileEditDialog({ open, onOpenChange, onSave, currentUser }: ProfileEditDialogProps) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      name: '',
      bio: '',
      avatar: '',
    }
  });

  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name);
      setValue('bio', currentUser.bio);
      setValue('avatar', currentUser.avatar);
    }
  }, [currentUser, setValue]);

  const onSubmit = (data: ProfileFormData) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Actualiza tu información personal
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="Tu nombre"
              {...register('name', { 
                required: 'El nombre es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              id="bio"
              placeholder="Cuéntanos sobre ti..."
              {...register('bio', {
                maxLength: { value: 160, message: 'Máximo 160 caracteres' }
              })}
            />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">URL del Avatar</Label>
            <Input
              id="avatar"
              placeholder="https://ejemplo.com/foto.jpg"
              {...register('avatar')}
            />
            <p className="text-xs text-muted-foreground">
              Enlace a una imagen pública para tu foto de perfil
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
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

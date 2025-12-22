import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileView } from '../ProfileView';
import { describe, it, expect, vi } from 'vitest';

// Mock the dialog component since we are testing ProfileView primarily
// but we want to ensure the edit button triggers something.
// However, integration testing with the real dialog is better if possible.
// Let's stick to testing what's on screen.

describe('ProfileView', () => {
  it('renders user profile information correctly in Spanish', () => {
    render(<ProfileView />);
    
    expect(screen.getByText('Axtra')).toBeInTheDocument();
    expect(screen.getByText('Nivel 12')).toBeInTheDocument();
    expect(screen.getByText(/Entusiasta del seguimiento de hábitos/i)).toBeInTheDocument();
  });

  it('renders stats cards in Spanish', () => {
    render(<ProfileView />);
    
    expect(screen.getByText('Total de Hábitos')).toBeInTheDocument();
    expect(screen.getByText('450')).toBeInTheDocument();
    expect(screen.getByText('Racha Actual')).toBeInTheDocument();
  });

  it('renders activity history in Spanish', () => {
    render(<ProfileView />);
    
    expect(screen.getByText('Historial de Actividad')).toBeInTheDocument();
    expect(screen.getAllByText('Hábito completado')[0]).toBeInTheDocument();
    expect(screen.getByText('Correr por la mañana')).toBeInTheDocument();
  });

  it('opens edit dialog when edit button is clicked', async () => {
    render(<ProfileView />);
    
    const editButton = screen.getByRole('button', { name: /editar perfil/i });
    fireEvent.click(editButton);

    // Check if dialog description appears (which implies dialog is open)
    expect(await screen.findByText('Actualiza tu información personal')).toBeInTheDocument();
    
    // Check if dialog title exists (there might be multiple 'Editar Perfil' texts, one in button, one in title)
    const titles = await screen.findAllByText('Editar Perfil');
    expect(titles.length).toBeGreaterThanOrEqual(1);
  });
});

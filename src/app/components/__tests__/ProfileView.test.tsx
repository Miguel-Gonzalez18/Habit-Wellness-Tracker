import { render, screen } from '@testing-library/react';
import { ProfileView } from '../ProfileView';
import { describe, it, expect } from 'vitest';

describe('ProfileView', () => {
  it('renders user profile information correctly', () => {
    render(<ProfileView />);
    
    expect(screen.getByText('Axtra')).toBeInTheDocument();
    expect(screen.getByText('Level 12')).toBeInTheDocument();
    expect(screen.getByText(/Enthusiastic habit tracker/i)).toBeInTheDocument();
  });

  it('renders stats cards', () => {
    render(<ProfileView />);
    
    expect(screen.getByText('Total Habits')).toBeInTheDocument();
    expect(screen.getByText('450')).toBeInTheDocument();
    expect(screen.getByText('Current Streak')).toBeInTheDocument();
  });

  it('renders activity history', () => {
    render(<ProfileView />);
    
    expect(screen.getByText('Activity History')).toBeInTheDocument();
    expect(screen.getAllByText('Completed habit')[0]).toBeInTheDocument();
    expect(screen.getByText('Morning Jog')).toBeInTheDocument();
  });
});

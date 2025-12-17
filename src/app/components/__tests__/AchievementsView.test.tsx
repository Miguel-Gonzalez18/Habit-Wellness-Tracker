import { render, screen } from '@testing-library/react';
import { AchievementsView } from '../AchievementsView';
import { describe, it, expect } from 'vitest';

describe('AchievementsView', () => {
  it('renders level progress correctly', () => {
    render(<AchievementsView />);
    
    expect(screen.getByText('Level 5')).toBeInTheDocument();
    expect(screen.getByText(/1250 XP/)).toBeInTheDocument();
  });

  it('renders achievements list', () => {
    render(<AchievementsView />);
    
    expect(screen.getByText('Early Bird')).toBeInTheDocument();
    expect(screen.getByText('Streak Master')).toBeInTheDocument();
    expect(screen.getByText('Night Owl')).toBeInTheDocument();
  });

  it('displays correct status for achievements', () => {
    render(<AchievementsView />);
    
    // Early Bird is unlocked
    expect(screen.getAllByText('Unlocked')[0]).toBeInTheDocument();
    
    // Wellness Warrior is in progress (35/50)
    expect(screen.getByText('35 / 50')).toBeInTheDocument();
  });
});

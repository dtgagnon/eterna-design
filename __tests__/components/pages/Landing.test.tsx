import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Landing from '@/components/pages/Landing';
import { ThemeProvider } from '@/providers/ThemeContext';

vi.mock('@/components/templates', () => ({
  MainLayout: vi.fn(({ children }) => <div data-testid="main-layout">{children}</div>),
  SectionLayout: vi.fn(({ children, title }) => (
    <div data-testid="section-layout">
      <h1>{title}</h1>
      {children}
    </div>
  ))
}));

vi.mock('@/components/organisms', () => ({
  Hero: () => <div data-testid="hero" />
}));

vi.mock('@/components/atoms', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span data-testid="badge">{children}</span>
}));

describe('Landing Page Component', () => {
  it('renders hero and feature badges', () => {
    render(
      <ThemeProvider>
        <Landing />
      </ThemeProvider>
    );

    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    const badges = screen.getAllByTestId('badge');
    expect(badges).toHaveLength(3);
  });
});

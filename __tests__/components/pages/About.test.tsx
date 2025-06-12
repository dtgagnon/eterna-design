import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import About from '@/components/pages/About';
import { ThemeProvider } from '@/providers/ThemeContext';

vi.mock('@/components/templates', () => ({
  MainLayout: vi.fn(({ children }) => <div data-testid="main-layout">{children}</div>),
  SectionLayout: vi.fn(({ children, title, subtitle, centered }) => (
    <div data-testid="section-layout" data-centered={centered?.toString()}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {children}
    </div>
  ))
}));

vi.mock('@/components/atoms', () => ({
  ProfileImage: () => <div data-testid="profile-image" />
}));

describe('About Page Component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <About />
      </ThemeProvider>
    );
  });

  it('renders main layout and section layout', () => {
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    const section = screen.getByTestId('section-layout');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('data-centered', 'true');
  });

  it('displays page title and subtitle', () => {
    expect(screen.getByText('About Eterna Design')).toBeInTheDocument();
    expect(screen.getByText('Crafting thoughtful digital experiences')).toBeInTheDocument();
  });

  it('shows profile image', () => {
    expect(screen.getByTestId('profile-image')).toBeInTheDocument();
  });
});

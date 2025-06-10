import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import HomeRoute from '@/app/page'; // Testing the Next.js page route component
import { ThemeProvider } from '@/providers/ThemeContext'; // ThemeProvider for context

// Mock Navbar as it is a direct child of the page layout
vi.mock('@/components/organisms/Navbar', () => ({
  default: ({ className }: { className?: string }) => (
    <nav data-testid="navbar-mock" className={className}>
      Navbar Mock
    </nav>
  )
}));


describe('Home Page Route (app/page.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <ThemeProvider>
        <HomeRoute />
      </ThemeProvider>
    );
  });

  it('renders the Navbar component', () => {
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
  });

  it('renders the footer text', () => {
    const matches = screen.getAllByText(/Eterna Design/);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('renders the main structural elements of the page', () => {
    const header = screen.getByRole('banner'); // <header>
    const main = screen.getByRole('main');    // <main>
    const footer = screen.getByRole('contentinfo'); // <footer>

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    // Check if Navbar is in the header
    expect(header).toContainElement(screen.getByTestId('navbar-mock'));
  });
});

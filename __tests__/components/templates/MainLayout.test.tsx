import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainLayout from '@/components/templates/MainLayout';
import { ThemeProvider } from '@/providers/ThemeContext';
import { fireEvent } from '@testing-library/react';

// Mock necessary components
vi.mock('@/components/organisms', () => ({
  Navbar: () => (
    <div data-testid="navbar">
      <button data-testid="resume-button">Resume</button>
    </div>
  ),
  Footer: () => <div data-testid="footer">Footer</div>
}));

vi.mock('@/components/atoms', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>
}));



describe('MainLayout component', () => {
  // Functional tests
  describe('Functionality', () => {
    it('renders with navbar, theme toggle, and content', () => {
      render(
        <ThemeProvider>
          <MainLayout>
            <div>Main Content</div>
          </MainLayout>
        </ThemeProvider>
      );
      
      // Verify key components are rendered
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });
    
    it('renders with footer by default', () => {
      render(
        <ThemeProvider>
          <MainLayout>
            <div>Main Content</div>
          </MainLayout>
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
    
    it('does not render footer when showFooter is false', () => {
      render(
        <ThemeProvider>
          <MainLayout showFooter={false}>
            <div>Main Content</div>
          </MainLayout>
        </ThemeProvider>
      );
      
      expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    });
    
    it('applies custom class to main element', () => {
      const { container } = render(
        <ThemeProvider>
          <MainLayout className="custom-class">
            <div>Main Content</div>
          </MainLayout>
        </ThemeProvider>
      );
      
      const mainElement = container.querySelector('main');
      expect(mainElement).toHaveClass('custom-class');
    });


  });

  // Viewport tests
  describe('Viewport requirements', () => {
    it('constrains root container to viewport height', () => {
      const { container } = render(
        <ThemeProvider>
          <MainLayout>
            <div data-testid="main-content">Main Content</div>
          </MainLayout>
        </ThemeProvider>
      );
      
      const rootContainer = container.querySelector('div:first-child');
      expect(rootContainer).toBeInTheDocument();
      expect(rootContainer).toHaveClass('overflow-hidden');
      
      // Check for modern viewport units which use arbitrary value syntax
      if (rootContainer) {
        expect(rootContainer.className).toContain('h-[100vh]');
        expect(rootContainer.className).toContain('max-h-[100dvh]');
      }
    });

    it('makes main content area take available height', () => {
      const { container } = render(
        <ThemeProvider>
          <MainLayout>
            <div data-testid="main-content">Main Content</div>
          </MainLayout>
        </ThemeProvider>
      );
      
      const mainElement = container.querySelector('main');
      expect(mainElement).toHaveClass('min-h-0'); // Prevents flexbox from expanding beyond container
      expect(mainElement).toHaveClass('overflow-auto');
      expect(mainElement).toHaveClass('flex-1');
    });

    it('should not require scrolling with all elements visible within the viewport at any size', () => {
      // Test with smaller viewport dimensions
      Object.defineProperty(window, 'innerHeight', { value: 600, writable: true });
      Object.defineProperty(window, 'innerWidth', { value: 800, writable: true });
      
      // Mock a large content div that would normally cause overflow
      const largeContent = (
        <div data-testid="large-content" style={{ minHeight: '300px' }}>
          Content tall enough to potentially cause overflow
        </div>
      );
      
      // Rendering component with footer explicitly shown
      const { container } = render(
        <ThemeProvider>
          <MainLayout showFooter={true}>
            {largeContent}
          </MainLayout>
        </ThemeProvider>
      );
      
      // Root container should use viewport height and constrain content
      const rootContainer = container.querySelector('div:first-child');
      expect(rootContainer).toBeInTheDocument();
      expect(rootContainer).toHaveClass('flex');
      expect(rootContainer).toHaveClass('flex-col');
      expect(rootContainer).toHaveClass('overflow-hidden');
      // Modern viewport units - check with className directly to handle arbitrary values
      if (rootContainer) {
        expect(rootContainer.className).toContain('h-[100vh]'); // Using arbitrary value syntax
        expect(rootContainer.className).toContain('max-h-[100dvh]'); // Using dynamic viewport height
      }
      
      // Header should have a fixed height and not expand
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex-shrink-0');
      
      // Main content area should flex to fill available space
      const mainElement = container.querySelector('main');
      expect(mainElement).toHaveClass('overflow-auto');
      expect(mainElement).toHaveClass('flex-1');
      expect(mainElement).toHaveClass('min-h-0'); // Crucial for flexbox to prevent overflow
      
      // Mock the footer component
      // Note: We can't directly test the Footer component because it's mocked in the test
      // We can check if the MainLayout correctly renders it with proper props
      const mockFooters = screen.getAllByTestId('footer');
      expect(mockFooters.length).toBeGreaterThan(0);
      
    });
  });

  // Visual tests
  describe('Visual appearance', () => {
    let container: HTMLElement;

    beforeEach(() => {
      const renderResult = render(
        <ThemeProvider>
          <MainLayout>
            <div data-testid="main-content">Main Content</div>
          </MainLayout>
        </ThemeProvider>
      );
      container = renderResult.container;
    });

    it('has appropriate background color', () => {
      const mainElement = container.querySelector('main');
      expect(mainElement).toHaveClass('bg-navy-900', 'dark:bg-navy-950');
    });

    // Layout style checks

    it('applies responsive padding to content', () => {
      const contentContainer = container.querySelector('main > div');
      expect(contentContainer).toHaveClass('px-4', 'md:px-8');
    });
    
    it('applies correct theme transition styles', () => {
      const mainContainer = container.querySelector('div:first-child');
      expect(mainContainer).toHaveClass('transition-colors');
      expect(mainContainer).toHaveClass('bg-navy-900', 'dark:bg-navy-950');
      expect(mainContainer).toHaveClass('text-gray-100', 'dark:text-white');
    });
  });
});

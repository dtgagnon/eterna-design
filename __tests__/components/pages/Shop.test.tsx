import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Shop from '@/components/pages/Shop';
import { ThemeProvider } from '@/providers/ThemeContext';


vi.mock('@/components/organisms', () => ({
  ShopItemCard: ({ item }: { item: { name: string } }) => <div data-testid="item">{item.name}</div>
}));

vi.mock('@/components/templates', () => ({
  MainLayout: vi.fn(({ children }) => <div data-testid="main-layout">{children}</div>),
  SectionLayout: vi.fn(({ children, title }) => (
    <div data-testid="section-layout">
      <h1>{title}</h1>
      {children}
    </div>
  ))
}));

describe('Shop Page Component', () => {
  it('renders products from data file', async () => {
    const element = await Shop();
    render(<ThemeProvider>{element}</ThemeProvider>);

    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    const items = screen.getAllByTestId('item');
    expect(items.length).toBeGreaterThan(0);
  });
});

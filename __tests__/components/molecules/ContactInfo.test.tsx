import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactInfo from '@/components/molecules/ContactInfo';

describe('ContactInfo component', () => {
  const defaultProps = {
    name: 'Eterna Design',
    email: 'info@example.com'
  };

  it('renders name and email correctly', () => {
    render(<ContactInfo {...defaultProps} showEmail={true} />);
    
    expect(screen.getByText('Eterna Design')).toBeInTheDocument();
    expect(screen.getByText('info@example.com')).toBeInTheDocument();
  });
  
  it('renders name in a heading element', () => {
    render(<ContactInfo {...defaultProps} />);
    
    const nameHeading = screen.getByText('Eterna Design');
    expect(nameHeading.tagName).toBe('H2');
    expect(nameHeading).toHaveClass('text-2xl', 'font-semibold');
  });
  
  it('creates a mailto link for the email', () => {
    render(<ContactInfo {...defaultProps} showEmail={true} />);
    
    const emailLink = screen.getByText('info@example.com');
    expect(emailLink.tagName).toBe('A');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@example.com');
  });
  
  it('applies accessibility attributes to the email link', () => {
    render(<ContactInfo {...defaultProps} showEmail={true} />);
    
    const emailLink = screen.getByText('info@example.com');
    expect(emailLink).toHaveAttribute('aria-label', 'Send email to Eterna Design');
  });
  
  it('shows label when showLabel is true', () => {
    render(<ContactInfo {...defaultProps} showEmail={true} showLabel={true} />);
    
    expect(screen.getByText('Email:')).toBeInTheDocument();
  });
  
  it('does not show label when showLabel is false', () => {
    render(<ContactInfo {...defaultProps} showEmail={true} showLabel={false} />);
    
    expect(screen.queryByText('Email:')).not.toBeInTheDocument();
  });
  
  it('applies custom className to container', () => {
    render(<ContactInfo {...defaultProps} className="test-class" />);
    
    const container = screen.getByText('Eterna Design').closest('div');
    expect(container).toHaveClass('test-class');
  });
  
  it('applies hover styling to email link', () => {
    render(<ContactInfo {...defaultProps} showEmail={true} />);
    
    const emailLink = screen.getByText('info@example.com');
    expect(emailLink).toHaveClass('hover:border-b', 'border-dashed');
  });
});

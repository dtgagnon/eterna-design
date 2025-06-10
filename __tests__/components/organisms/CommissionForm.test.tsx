import { render, screen } from '@testing-library/react';
import CommissionForm from '@/components/organisms/CommissionForm';
import '@testing-library/jest-dom';

describe('CommissionForm', () => {
  it('renders input fields', () => {
    render(<CommissionForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Details/i)).toBeInTheDocument();
  });
});

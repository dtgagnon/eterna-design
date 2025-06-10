import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

interface CommissionFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  details: string;
  budget: string;
}

export default function CommissionForm({ className = '' }: CommissionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    details: '',
    budget: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is being edited
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.details.trim()) {
      newErrors.details = 'Details are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await fetch('/api/commissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', details: '', budget: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`} role="form">
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-md">
          Thank you for your request! I&apos;ll get back to you as soon as possible.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md">
          There was an error sending your request. Please try again later.
        </div>
      )}
      
      <div>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Name"
          required
          placeholder="Your name"
          error={errors.name}
        />
      </div>
      
      <div>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
          required
          placeholder="your.email@example.com"
          error={errors.email}
          autoComplete="email"
        />
      </div>
      
      <div>
        <label
          htmlFor="details"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Project Details<span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          rows={5}
          className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent ${errors.details ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Your details"
          required
        />
        {errors.details && (
          <p className="text-red-500 text-xs mt-1">{errors.details}</p>
        )}
      </div>

      <div>
        <Input
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          label="Estimated Budget"
          placeholder="Optional"
        />
      </div>
      
      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          size="md"
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Submitting...' : 'Request Commission'}
        </Button>
      </div>
    </form>
  );
}

import React from 'react';
import { Button, ProfileImage } from '@/components/atoms';

interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
  imagePosition?: 'left' | 'right';
}

export default function Hero({
  title,
  subtitle,
  imageSrc = '/images/logo-ani-0.jpeg',
  ctaText = 'View Projects',
  ctaLink = '/projects',
  className = '',
  imagePosition = 'right'
}: HeroProps) {
  return (
    <section className={`py-12 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${imagePosition === 'left' ? 'md:flex-row-reverse' : ''}`}>
          {/* Text content */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
            
            <div className="mt-8">
              <Button 
                onClick={() => window.location.href = ctaLink}
                variant="primary"
                size="lg"
              >
                {ctaText}
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex justify-center">
            {imageSrc && (
              <ProfileImage
                src={imageSrc}
                alt="Profile image"
                priority
                size="md"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
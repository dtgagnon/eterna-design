'use client';

import React from 'react';
import { Navbar, Footer } from '@/components/organisms';
import { ThemeToggle } from '@/components/atoms';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
}

export default function MainLayout({
  children,
  className = '',
  showFooter = true
}: MainLayoutProps) {

  return (
    <div className="flex flex-col h-[100vh] max-h-[100dvh] overflow-hidden bg-navy-900 dark:bg-navy-950 text-gray-100 dark:text-white transition-colors">
      {/* Header with fixed height */}
      <header className="flex-shrink-0 flex justify-between items-center px-4 md:px-8 py-3">
        <div className="flex items-center">
          <ThemeToggle />
        </div>
        <div className="flex items-center">
          <Navbar />
        </div>
      </header>
      
      {/* Main content area - takes remaining space and scrolls if needed */}
      <main className={`flex-1 min-h-0 max-h-[calc(100dvh-9rem)] bg-navy-900 dark:bg-navy-950 overflow-auto ${className}`}>
        <div className="flex flex-col justify-center h-full relative px-4 md:px-8 py-4 overflow-auto">
          {children}
        </div>
      </main>
      
      {/* Footer with fixed height */}
      {showFooter && <Footer className="flex-shrink-0 max-h-[6rem]" />}
      

    </div>
  );
}
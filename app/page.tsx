'use client';
import React from 'react';
import { Navbar, Hero } from '@/components/organisms';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <Navbar className="w-full" />
      </header>
      <main className="flex-grow flex items-center justify-center">
        <Hero
          title="Eterna Design"
          subtitle="Creative solutions for your brand"
          ctaText="Request a Quote"
          ctaLink="/commission"
        />
      </main>
      <footer className="flex items-center justify-center py-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Eterna Design</p>
      </footer>
    </div>
  );
}

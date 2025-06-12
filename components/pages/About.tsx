import React from 'react';
import { MainLayout, SectionLayout } from '@/components/templates';
import { ProfileImage } from '@/components/atoms';

export default function About() {
  return (
    <MainLayout>
      <SectionLayout
        title="About Eterna Design"
        subtitle="Crafting thoughtful digital experiences"
        centered
      >
        <div className="flex flex-col items-center space-y-6 max-w-2xl">
          <ProfileImage
            src="/images/logo-ani-0.jpeg"
            alt="Eterna Design"
            size="lg"
            priority
          />
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
            Eterna Design is a creative studio specializing in branding, web
            design and illustration. We focus on delivering clean, modern
            solutions that elevate your brand.
          </p>
        </div>
      </SectionLayout>
    </MainLayout>
  );
}

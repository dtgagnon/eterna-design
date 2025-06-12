import React from 'react';
import { Hero } from '@/components/organisms';
import { MainLayout, SectionLayout } from '@/components/templates';
import { Badge } from '@/components/atoms';

export default function Landing() {
  return (
    <MainLayout>
      <Hero
        title="Eterna Design"
        subtitle="Creative solutions for your brand"
        ctaText="Request a Quote"
        ctaLink="/commission"
      />
      <SectionLayout
        title="What We Offer"
        subtitle="A full range of design services"
        centered
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Badge>Brand Identity</Badge>
          <Badge>Web Design</Badge>
          <Badge>Illustration</Badge>
        </div>
      </SectionLayout>
    </MainLayout>
  );
}

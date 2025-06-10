import React from 'react';
import { MainLayout, SectionLayout } from '@/components/templates';
import { CommissionForm } from '@/components/organisms';

export default function Commission() {
  return (
    <MainLayout>
      <SectionLayout
        title="Commission Me"
        subtitle="Fill out the form below to start a design project"
        centered
      >
        <div className="max-w-xl mx-auto">
          <CommissionForm />
        </div>
      </SectionLayout>
    </MainLayout>
  );
}

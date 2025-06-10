import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import { ShopItemCard } from '@/components/organisms';
import { MainLayout, SectionLayout } from '@/components/templates';

async function getProducts() {
  const file = await fs.readFile(path.join(process.cwd(), 'data', 'products.json'), 'utf8');
  return JSON.parse(file) as Array<{ id: string; name: string; price: number; imageUrl: string; description: string }>;
}

export default async function Shop() {
  const products = await getProducts();
  return (
    <MainLayout>
      <SectionLayout title="Shop" subtitle="Design services and digital goods" centered>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <ShopItemCard key={p.id} item={p} />
          ))}
        </div>
      </SectionLayout>
    </MainLayout>
  );
}

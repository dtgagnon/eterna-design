'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';

interface Item {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface Props {
  item: Item;
}

export default function ShopItemCard({ item }: Props) {
  const handleBuy = async () => {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: item.id })
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="border rounded p-4 flex flex-col items-center gap-2">
      <Image src={item.imageUrl} alt={item.name} width={200} height={200} />
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
      <p className="font-medium">${(item.price / 100).toFixed(2)}</p>
      <Button onClick={handleBuy}>Buy</Button>
    </div>
  );
}

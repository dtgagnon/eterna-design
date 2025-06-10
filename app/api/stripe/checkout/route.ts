import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { promises as fs } from 'fs';
import path from 'path';

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeSecret, { apiVersion: '2023-10-16' });

async function getProducts() {
  const file = await fs.readFile(path.join(process.cwd(), 'data', 'products.json'), 'utf8');
  return JSON.parse(file) as Array<{ id: string; name: string; price: number; imageUrl: string; description: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const { itemId } = await request.json();
    const products = await getProducts();
    const product = products.find((p) => p.id === itemId);
    if (!product) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price_data: { currency: 'usd', product_data: { name: product.name }, unit_amount: product.price }, quantity: 1 }],
      success_url: `${request.nextUrl.origin}/shop?success=1`,
      cancel_url: `${request.nextUrl.origin}/shop?canceled=1`
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { CommissionRepository } from '@/lib/database';

export async function GET() {
  const commissions = CommissionRepository.findAll();
  return NextResponse.json({ commissions, success: true });
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, details, budget } = await request.json();
    if (!name || !email || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const commission = CommissionRepository.create({ name, email, details, budget });
    return NextResponse.json({ commission, success: true });
  } catch (e) {
    console.error('Commission API error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import Order from '@/app/src/models/Order';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET() {
  await dbConnect();

  try {
    const orders = await Order.find();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create order' }, { status: 500 });
  }
}

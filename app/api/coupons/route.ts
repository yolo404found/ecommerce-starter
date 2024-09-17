import { NextResponse } from 'next/server';
import Coupon from '@/app/src/models/Coupon';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET() {
  await dbConnect();

  try {
    const coupons = await Coupon.find();
    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch coupons' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const newCoupon = await Coupon.create(body);
    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create coupon' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import Coupon from '@/app/src/models/Coupon';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const coupon = await Coupon.findById(params.id);
    if (!coupon) {
      return NextResponse.json({ message: 'Coupon not found' }, { status: 404 });
    }
    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch coupon' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const body = await req.json();
    const updatedCoupon = await Coupon.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedCoupon) {
      return NextResponse.json({ message: 'Coupon not found' }, { status: 404 });
    }
    return NextResponse.json(updatedCoupon, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update coupon' }, { status: 500 });
  }
}

export async function DELETE(request:Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(params.id);
    if (!deletedCoupon) {
      return NextResponse.json({ message: 'Coupon not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Coupon deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete coupon' }, { status: 500 });
  }
}

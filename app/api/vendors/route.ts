import { NextResponse } from 'next/server';
import Vendor from '@/app/src/models/Vendor';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET() {
  await dbConnect();

  try {
    const vendors = await Vendor.find();
    return NextResponse.json(vendors, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch vendors' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const newVendor = await Vendor.create(body);
    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create vendor' }, { status: 500 });
  }
}

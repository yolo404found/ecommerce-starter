import { NextResponse } from 'next/server';
import Vendor from '@/app/src/models/Vendor';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const vendor = await Vendor.findById(params.id);
    if (!vendor) {
      return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
    }
    return NextResponse.json(vendor, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch vendor' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const body = await req.json();
    const updatedVendor = await Vendor.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedVendor) {
      return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
    }
    return NextResponse.json(updatedVendor, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update vendor' }, { status: 500 });
  }
}

export async function DELETE(request:Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedVendor = await Vendor.findByIdAndDelete(params.id);
    if (!deletedVendor) {
      return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Vendor deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete vendor' }, { status: 500 });
  }
}

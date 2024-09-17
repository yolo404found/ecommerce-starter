import { NextResponse } from 'next/server';
import Wishlist from '@/app/src/models/Wishlist';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const wishlist = await Wishlist.findById(params.id);
    if (!wishlist) {
      return NextResponse.json({ message: 'Wishlist not found' }, { status: 404 });
    }
    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const body = await req.json();
    const updatedWishlist = await Wishlist.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedWishlist) {
      return NextResponse.json({ message: 'Wishlist not found' }, { status: 404 });
    }
    return NextResponse.json(updatedWishlist, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update wishlist' }, { status: 500 });
  }
}

export async function DELETE(request:Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedWishlist = await Wishlist.findByIdAndDelete(params.id);
    if (!deletedWishlist) {
      return NextResponse.json({ message: 'Wishlist not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Wishlist deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete wishlist' }, { status: 500 });
  }
}

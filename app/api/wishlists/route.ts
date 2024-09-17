import { NextResponse } from 'next/server';
import Wishlist from '@/app/src/models/Wishlist';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET() {
  await dbConnect();

  try {
    const wishlists = await Wishlist.find();
    return NextResponse.json(wishlists, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch wishlists' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const newWishlist = await Wishlist.create(body);
    return NextResponse.json(newWishlist, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create wishlist' }, { status: 500 });
  }
}

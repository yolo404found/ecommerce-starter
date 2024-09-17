import { NextResponse } from 'next/server';
import Review from '@/app/src/models/Review';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET() {
  await dbConnect();

  try {
    const reviews = await Review.find();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const newReview = await Review.create(body);
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create review' }, { status: 500 });
  }
}

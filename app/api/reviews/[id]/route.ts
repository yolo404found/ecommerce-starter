import { NextResponse } from 'next/server';
import Review from '@/app/src/models/Review';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const review = await Review.findById(params.id);
    if (!review) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch review' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const body = await req.json();
    const updatedReview = await Review.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedReview) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request:Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedReview = await Review.findByIdAndDelete(params.id);
    if (!deletedReview) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Review deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete review' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import User from '@/app/src/models/User';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const body = await req.json();
    const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request:Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedUser = await User.findByIdAndDelete(params.id);
    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
  }
}

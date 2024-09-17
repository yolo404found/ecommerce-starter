import { NextResponse } from 'next/server';
import Category from '@/app/src/models/Category';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const category = await Category.findById(params.id);
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch category' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const body = await req.json();
    const updatedCategory = await Category.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedCategory) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request:Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedCategory = await Category.findByIdAndDelete(params.id);
    if (!deletedCategory) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete category' }, { status: 500 });
  }
}

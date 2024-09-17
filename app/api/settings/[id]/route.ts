import { NextResponse } from 'next/server';
import Settings from '@/app/src/models/Settings';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const setting = await Settings.findById(params.id);
    if (!setting) {
      return NextResponse.json({ message: 'Setting not found' }, { status: 404 });
    }
    return NextResponse.json(setting, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch setting' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const body = await req.json();
    const updatedSetting = await Settings.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedSetting) {
      return NextResponse.json({ message: 'Setting not found' }, { status: 404 });
    }
    return NextResponse.json(updatedSetting, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update setting' }, { status: 500 });
  }
}

export async function DELETE(request:Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedSetting = await Settings.findByIdAndDelete(params.id);
    if (!deletedSetting) {
      return NextResponse.json({ message: 'Setting not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Setting deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete setting' }, { status: 500 });
  }
}

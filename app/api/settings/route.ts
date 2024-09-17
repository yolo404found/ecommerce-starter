import { NextResponse } from 'next/server';
import Settings from '@/app/src/models/Settings';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET() {
  await dbConnect();

  try {
    const settings = await Settings.find();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const newSettings = await Settings.create(body);
    return NextResponse.json(newSettings, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create settings' }, { status: 500 });
  }
}

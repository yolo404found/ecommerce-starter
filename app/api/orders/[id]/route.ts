import { NextResponse } from 'next/server';
import Order from '@/app/src/models/Order';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET(request:Request ,{ params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const order = await Order.findById(params.id);
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const body = await req.json();
    const updatedOrder = await Order.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(request:Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedOrder = await Order.findByIdAndDelete(params.id);
    if (!deletedOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Order deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete order' }, { status: 500 });
  }
}

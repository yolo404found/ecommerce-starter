import { NextResponse } from 'next/server';
import Product from '@/app/src/models/Product';
import dbConnect from '@/app/src/utils/dbConnect';

export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const body = await req.json(); 
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `Failed to create product`}, { status: 500 });
  }
}

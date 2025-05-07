import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching category' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, slug, icon } = body;
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, slug, icon },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Category deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting category' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { Category } from '@/lib/interfaces';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    console.log('Attempting to create a new category...');
    const json = await request.json();
    const category = await prisma.category.create({
 data: json as Category,
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    let errorMessage = 'Failed to create category';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Attempting to fetch categories...');
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    let errorMessage = 'Failed to fetch categories';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
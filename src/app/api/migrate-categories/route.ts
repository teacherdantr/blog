import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    for (const category of categories) {
      try {
        const parsedCreatedAt = new Date(category.createdAt);

        await prisma.category.update({
          where: { id: category.id },
          data: { createdAt: parsedCreatedAt },
        });
      } catch (error) {
        console.error('Error updating category:', category.id);
        console.error('Message:', (error as any).message);
        console.error('Stack:', (error as any).stack);
      }
    }

    return NextResponse.json({ message: 'Category migration completed' });
  } catch (error) {
    console.error('Error fetching categories:');
    console.error('Message:', (error as any).message);
    console.error('Stack:', (error as any).stack);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
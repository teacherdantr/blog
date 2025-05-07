
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const articles = await prisma.article.findMany();
    const categories = await prisma.category.findMany();

    console.log('Starting category migration...');
    for (const category of categories) {
      try {
        // Re-setting createdAt and updatedAt to ensure they are valid Date objects
        await prisma.category.update({
          where: { id: category.id },
          data: { createdAt: category.createdAt, updatedAt: category.updatedAt },
        });
        console.log(`Updated category ${category.id}`);
      } catch (updateError) {
        console.error(`Error updating category ${category.id}:`, (updateError as any).message);
      }
    }

    for (const article of articles) {
      try {
        const oldPublishDate = article.publishDate as any; // Cast to any to handle the string or Date possibility
        
        const newPublishDate = new Date(oldPublishDate);

        await prisma.article.update({
          where: { id: article.id },
          data: { publishDate: newPublishDate },
        });
        console.log(`Updated article ${article.id}`);
      } catch (updateError) {
        console.error(`Error updating article ${article.id}:`);
        console.error('Message:', (updateError as any).message);
        console.error('Stack:', (updateError as any).stack);
      }
    }

    return NextResponse.json({ message: 'Migration completed' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching or updating articles:');
    console.error('Message:', (error as any).message);
    console.error('Stack:', (error as any).stack);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
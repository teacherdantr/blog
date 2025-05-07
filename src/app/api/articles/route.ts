import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { Article } from '@/lib/interfaces';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, snippet, author, publishDate, imageUrl, imageHint, categoryId } = body;

    const parsedPublishDate = new Date(publishDate);
    const article = await prisma.article.create({ 
      data: {
        slug,
        title,
        snippet,
        author,
        publishDate: parsedPublishDate,
        imageUrl,
        imageHint,
        categoryId,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('Fetching articles...');
    const articles: Article[] = await prisma.article.findMany();
    console.log('Articles fetched:', articles.length);
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error('Error fetching articles:');
    console.error('Message:', (error as any).message);
    console.error('Stack:', (error as any).stack);
    if ((error as any).clientVersion) {
      console.error('Client Version:', (error as any).clientVersion);
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
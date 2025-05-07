import { NextResponse } from 'next/server';
import { Category } from '@/lib/interfaces';

const mockCategories: Category[] = [
  {
    id: 'cat1', // Use string for ID
    name: 'Technology',
    slug: 'technology',
    icon: ' tecnológicas', // Assuming this is a valid icon representation
    articles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat2',
    name: 'Science',
    slug: 'science',
    icon: 'ciências',
    articles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat3',
    name: 'Health',
    slug: 'health',
    icon: 'saúde',
    articles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat4',
    name: 'Business',
    slug: 'business',
    icon: 'negócios',
    articles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat5',
 name: 'Sports',
 slug: 'sports',
 icon: 'esportes',
    articles: [],
 createdAt: new Date(),
 updatedAt: new Date(),
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockCategories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
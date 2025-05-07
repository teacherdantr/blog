
import { NextResponse } from 'next/server';

const mockArticlesDb = [
  {
    id: '1',
    slug: 'article-1',
    title: 'Article 1',
    snippet: 'Snippet for Article 1.',
    author: 'Author 1',
    publishDate: new Date('2023-10-27T10:00:00Z'),
    imageUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 100) + 1}/600/400`,
    imageHint: 'Article 1 Image',
    categoryId: 'nextjs',
    createdAt: new Date('2023-10-27T10:00:00Z'),
    updatedAt: new Date('2023-10-27T10:00:00Z'),
  },
  {
    id: '2',
    slug: 'article-2',
    title: 'Article 2',
    snippet: 'Snippet for Article 2.',
    author: 'Author 2',
    publishDate: new Date('2023-10-26T09:00:00Z'),
    imageUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 100) + 1}/600/400`,
    updatedAt: new Date('2023-10-24T11:00:00Z'),
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockArticlesDb, { status: 200 });
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function createMockArticle(index: number) {
  const id = `${index}`;
  const slug = `article-${index}`;
  const title = `Article ${index}`;
  const snippet = `Snippet for Article ${index}.`;
  const author = `Author ${index}`;
  const publishDate = new Date(`2023-10-${27 - Math.floor(index / 2)}T${10 + index % 2}:00:00Z`);
  const imageUrl = `https://picsum.photos/seed/${Math.floor(Math.random() * 100) + 1}/600/400`;
  const imageHint = `Article ${index} Image`;
  const categoryId = `cat${(index % 3) + 1}`; // Assign to categories cat1, cat2, or cat3
  const createdAt = new Date(publishDate);
  const updatedAt = new Date(publishDate);

  return { id, slug, title, snippet, author, publishDate, imageUrl, imageHint, categoryId, createdAt, updatedAt };
}

// Generate 20 mock articles
for (let i = 5; i <= 20; i++) {
  mockArticlesDb.push(createMockArticle(i));
}
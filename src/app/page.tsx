

import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'; // Corrected import path if needed, but should resolve now
import { Button } from '@/components/ui/button';
import { Newspaper, Tag, Calendar, User } from 'lucide-react'; // Icons for categories (Replaced News with Newspaper)
import { format } from 'date-fns';

// Mock data - replace with actual API calls later
interface Article {
  slug: string;
  title: string;
  snippet: string;
  author?: string;
  publishDate: Date;
  category: string;
  imageUrl: string;
  imageHint: string;
}

interface Category {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { name: 'Technology', slug: 'technology', icon: <Newspaper className="mr-2 h-4 w-4" /> }, // Used Newspaper
  { name: 'Politics', slug: 'politics', icon: <Tag className="mr-2 h-4 w-4" /> },
  { name: 'World', slug: 'world', icon: <Calendar className="mr-2 h-4 w-4" /> }, // Consider World icon if available or Globe
  { name: 'Business', slug: 'business', icon: <User className="mr-2 h-4 w-4" /> }, // Consider Briefcase icon
];

const mockArticles: Article[] = Array.from({ length: 15 }, (_, i) => ({
  slug: `article-${i + 1}`,
  title: `Headline News Story ${i + 1}: A Deep Dive`,
  snippet: `This is a preview snippet for article ${i + 1}. It gives a brief overview of the content, enticing the reader to click and learn more about this important topic.`,
  author: i % 3 === 0 ? undefined : `Author ${String.fromCharCode(65 + (i % 5))}`,
  publishDate: new Date(2024, 5, 20 - i),
  category: categories[i % categories.length].name,
  imageUrl: `https://picsum.photos/seed/${i + 1}/600/400`,
  imageHint: 'news article',
}));


async function getArticles(page = 1, categorySlug?: string): Promise<{ articles: Article[]; totalPages: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));

  let filteredArticles = mockArticles;
  if (categorySlug) {
    const category = categories.find(c => c.slug === categorySlug);
    if (category) {
      filteredArticles = mockArticles.filter(article => article.category === category.name);
    }
  }

  const articlesPerPage = 10;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  return { articles: paginatedArticles, totalPages };
}

async function getCategories(): Promise<Category[]> {
   // Simulate API delay
   await new Promise(resolve => setTimeout(resolve, 50));
   return categories;
}


export default async function Home({ searchParams }: { searchParams?: { page?: string; category?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const currentCategory = searchParams?.category;
  const { articles, totalPages } = await getArticles(currentPage, currentCategory);
  const fetchedCategories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar for Categories */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Categories</h2>
          <nav className="flex flex-wrap md:flex-col gap-2">
            <Link href="/" passHref>
              <Button variant={!currentCategory ? 'secondary' : 'ghost'} className="w-full justify-start">
                All Articles
              </Button>
            </Link>
            {fetchedCategories.map((category) => (
              <Link key={category.slug} href={`/?category=${category.slug}`} passHref>
                <Button
                  variant={currentCategory === category.slug ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                >
                  {category.icon}
                  {category.name}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            {currentCategory ? categories.find(c => c.slug === currentCategory)?.name : 'Latest News'}
          </h1>

          {articles.length === 0 ? (
            <p className="text-muted-foreground">No articles found for this category.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.slug} className="flex flex-col overflow-hidden bg-card hover:shadow-lg transition-shadow duration-200">
                  <Link href={`/articles/${article.slug}`} className="block">
                    <CardHeader className="p-0">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={article.imageHint}
                      />
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                      <CardTitle className="text-lg font-semibold leading-tight mb-2 text-foreground hover:text-accent transition-colors duration-200">
                        {article.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-3">{article.snippet}</p>
                    </CardContent>
                  </Link>
                   <CardFooter className="p-4 pt-0 mt-auto text-xs text-muted-foreground flex justify-between items-center">
                     <div>
                       {article.author && <span className="flex items-center"><User className="mr-1 h-3 w-3" /> {article.author}</span>}
                     </div>
                     <span className="flex items-center">
                       <Calendar className="mr-1 h-3 w-3" />
                       {format(article.publishDate, 'MMM d, yyyy')}
                     </span>
                   </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={currentPage > 1 ? `/?${currentCategory ? `category=${currentCategory}&` : ''}page=${currentPage - 1}` : '#'}
                    aria-disabled={currentPage <= 1}
                    tabIndex={currentPage <= 1 ? -1 : undefined}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => {
                  const page = i + 1;
                  // Basic pagination display logic (show first, last, current, and nearby pages)
                  const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                  const showEllipsis = Math.abs(page - currentPage) === 2 && totalPages > 5;

                  if (showEllipsis && page < currentPage) {
                    return <PaginationItem key={`ellipsis-start-${page}`}><PaginationEllipsis /></PaginationItem>;
                  }
                  if (showPage) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href={`/?${currentCategory ? `category=${currentCategory}&` : ''}page=${page}`}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                   if (showEllipsis && page > currentPage) {
                    return <PaginationItem key={`ellipsis-end-${page}`}><PaginationEllipsis /></PaginationItem>;
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    href={currentPage < totalPages ? `/?${currentCategory ? `category=${currentCategory}&` : ''}page=${currentPage + 1}` : '#'}
                    aria-disabled={currentPage >= totalPages}
                    tabIndex={currentPage >= totalPages ? -1 : undefined}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  );
}

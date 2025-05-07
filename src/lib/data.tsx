import { Category, Article } from '@/lib/interfaces';
import { Newspaper, Tag, Calendar, User } from 'lucide-react';

const categories: Category[] = [
  /*
 * Static array of predefined categories. In a real application, this data would likely be fetched from an API or database.
 */
  { name: 'Technology', slug: 'technology', icon:() => <Newspaper className="mr-2 h-4 w-4" /> },
  { name: 'Politics', slug: 'politics', icon: () => <Tag className="mr-2 h-4 w-4" /> },
  { name: 'World', slug: 'world', icon:() => <Calendar className="mr-2 h-4 w-4" /> },
  { name: 'Business', slug: 'business', icon:() => <User className="mr-2 h-4 w-4" /> },
] as Category[]; // Explicitly cast to Category[] for clarity and type safety

const mockArticles: Article[] = Array.from({ length: 15 }, (_, i) => ({
  /*
 * Generates an array of mock article data. This is used to simulate fetching articles from a backend.
 * The data is structured according to the `Article` interface.
 */
  slug: `article-${i + 1}`,
  title: `Headline News Story ${i + 1}: A Deep Dive`,
  snippet: `This is a preview snippet for article ${i + 1}. It gives a brief overview of the content, enticing the reader to click and learn more about this important topic.`,
  author: i % 3 === 0 ? undefined : `Author ${String.fromCharCode(65 + (i % 5))}`, // Assigns an author to 2/3 of the articles
  publishDate: new Date(2024, 5, 20 - i),
  category: categories[i % categories.length].name,
  imageUrl: `https://picsum.photos/seed/${i + 1}/600/400`,
  imageHint: 'news article',
}));

/**
 * Asynchronously retrieves a paginated list of articles, optionally filtered by category.
 *
 * @param page - The requested page number (defaults to 1).
 * @param categorySlug - An optional slug to filter articles by category.
 * @returns A promise resolving to an object containing the array of articles for the requested page and the total number of pages.
 */
export async function getArticles(page = 1, categorySlug?: string): Promise<{ articles: Article[]; totalPages: number }> {
  // Simulate a network delay to mimic fetching data from an external source.
  await new Promise(resolve => setTimeout(resolve, 100)); // Increased delay slightly for better visualization

  // Start with all mock articles.
  let filteredArticles = mockArticles;
  if (categorySlug) {
    const category = categories.find(c => c.slug === categorySlug);
    // If a valid category slug is provided, filter the articles by category name.
    if (category) {
      filteredArticles = mockArticles.filter(article => article.category === category.name);
    }
  }

  const articlesPerPage = 10;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Calculate the start and end indices for the requested page.
  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;

  // Slice the filtered articles array to get the articles for the current page.
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Return the paginated articles and the total number of pages.
  return { articles: paginatedArticles, totalPages };
}

/**
 * Asynchronously retrieves the list of available categories.
 */
// Although static in this example, this function mimics an async API call.
export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100)); // Increased delay slightly
  return categories;
}
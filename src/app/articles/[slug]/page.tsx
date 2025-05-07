import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

// Mock data - replace with actual API calls later
interface Article {
  slug: string;
  title: string;
  body: string; // Assume HTML content
  author?: string;
  publishDate: Date;
  category: string;
  categorySlug: string;
  imageUrl: string;
  imageHint: string;
}

const categories = [ // Ensure this matches the categories on the homepage
  { name: 'Technology', slug: 'technology' },
  { name: 'Politics', slug: 'politics' },
  { name: 'World', slug: 'world' },
  { name: 'Business', slug: 'business' },
];

// Find an article based on slug
async function getArticle(slug: string): Promise<Article | null> {
   // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));

  const articleIndex = parseInt(slug.replace('article-', ''), 10) - 1;
  if (isNaN(articleIndex) || articleIndex < 0 || articleIndex >= 15) { // Assuming 15 mock articles
    return null;
  }

  const category = categories[articleIndex % categories.length];

  return {
    slug: `article-${articleIndex + 1}`,
    title: `Headline News Story ${articleIndex + 1}: A Deep Dive`,
    body: `
      <p class="mb-4">This is the main body content for article ${articleIndex + 1}. It provides in-depth information about the topic discussed in the headline.</p>
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h3 class="text-xl font-semibold my-4">Subsection Title</h3>
      <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Detail point one about the article.</li>
        <li>Another important detail or fact.</li>
        <li>Further elaboration on the topic.</li>
      </ul>
      <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.</p>
    `,
    author: articleIndex % 3 === 0 ? undefined : `Author ${String.fromCharCode(65 + (articleIndex % 5))}`,
    publishDate: new Date(2024, 5, 20 - articleIndex),
    category: category.name,
    categorySlug: category.slug,
    imageUrl: `https://picsum.photos/seed/${articleIndex + 1}/1200/600`, // Higher res for detail view
    imageHint: 'news article detail'
  };
}

// Placeholder for related articles
async function getRelatedArticles(currentSlug: string, categorySlug: string): Promise<Article[]> {
   // Simulate API delay
   await new Promise(resolve => setTimeout(resolve, 50));
   // Simple mock: return first 3 articles of the same category, excluding the current one
   const allArticlesInCategory = Array.from({ length: 15 }, (_, i) => {
       const cat = categories[i % categories.length];
       return {
           slug: `article-${i + 1}`,
           title: `Headline News Story ${i + 1}: A Deep Dive`,
           body: '', // Not needed for related list
           publishDate: new Date(2024, 5, 20 - i),
           category: cat.name,
           categorySlug: cat.slug,
           imageUrl: `https://picsum.photos/seed/${i + 1}/600/400`,
           imageHint: 'related article'
       };
   }).filter(a => a.categorySlug === categorySlug && a.slug !== currentSlug);

   return allArticlesInCategory.slice(0, 3);
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const awaitedParams = await params;
  const article = await getArticle(awaitedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found | NewsFlash',
    };
  }

  return {
    title: `${article.title} | NewsFlash`,
    description: article.body.substring(0, 160).replace(/<[^>]*>/g, '') + '...', // Basic description from body
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const awaitedParams = await params;
  const article = await getArticle(awaitedParams.slug);
  const relatedArticles = article ? await getRelatedArticles(article.slug, article.categorySlug) : [];


  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
         <Link href="/" className="inline-block mb-6">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
         </Link>
        <h1 className="text-2xl font-semibold text-destructive">Article Not Found</h1>
        <p className="text-muted-foreground mt-2">The article you are looking for does not exist or may have been moved.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
         <Link href="/" className="inline-block">
            <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
            </Button>
         </Link>
      </div>
      <article className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={1200}
          height={600}
          className="w-full h-64 md:h-96 object-cover"
          priority // Prioritize loading the main image
          data-ai-hint={article.imageHint}
        />
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-muted-foreground mb-4">
             <Link href={`/?category=${article.categorySlug}`} passHref>
                 <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                    <Tag className="mr-1 h-3 w-3" /> {article.category}
                 </Badge>
             </Link>
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" /> {format(article.publishDate, 'MMMM d, yyyy')}
            </span>
            {article.author && (
              <span className="flex items-center">
                <User className="mr-1 h-4 w-4" /> {article.author}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">{article.title}</h1>

          <Separator className="my-6" />

          {/* Use prose for rich text styling */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none text-foreground prose-headings:text-foreground prose-a:text-accent hover:prose-a:text-accent-hover"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </div>
      </article>

      {/* Related Articles Section (Optional) */}
      {relatedArticles.length > 0 && (
        <section className="max-w-3xl mx-auto mt-12">
           <h2 className="text-2xl font-semibold mb-6 text-foreground">Related Articles</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {relatedArticles.map((related) => (
               <Card key={related.slug} className="flex flex-col overflow-hidden bg-card hover:shadow-lg transition-shadow duration-200">
                 <Link href={`/articles/${related.slug}`} className="block">
                   <CardHeader className="p-0">
                     <Image
                       src={related.imageUrl}
                       alt={related.title}
                       width={600}
                       height={400}
                       className="w-full h-40 object-cover"
                        data-ai-hint={related.imageHint}
                     />
                   </CardHeader>
                   <CardContent className="p-4 flex-grow">
                     <Badge variant="secondary" className="mb-2 text-xs">{related.category}</Badge>
                     <CardTitle className="text-base font-semibold leading-tight text-foreground hover:text-accent transition-colors duration-200">
                       {related.title}
                     </CardTitle>
                   </CardContent>
                 </Link>
               </Card>
             ))}
           </div>
        </section>
      )}
    </div>
  );
}

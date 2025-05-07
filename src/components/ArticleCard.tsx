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
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { Article } from '@/lib/interfaces';

/**
 * ArticleCard component displays a single article summary.
 * It shows the article image, title, snippet, category badge, author, and publish date.
 */
export function ArticleCard({ article }: { article: Article }) {
  return (
    // The main card container with basic styling and hover effects.
    <Card className="flex flex-col overflow-hidden bg-card hover:shadow-lg transition-shadow duration-200">
      {/* Link wrapping the card content for navigation to the full article */}
      <Link href={`/articles/${article.slug}`} className="block">
        {/* Card header containing the article image */}
        <CardHeader className="p-0">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={600}
            // Fixed image height for consistent card size
            height={400}
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="secondary" className="mb-2">
            {article.category}
          </Badge>
          <CardTitle className="text-lg font-semibold leading-tight mb-2 text-foreground hover:text-accent transition-colors duration-200">
            {article.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mb-3">
            {article.snippet}
          </p>
        </CardContent>
      </Link>
      {/* Card footer displaying author and publish date */}
      <CardFooter className="p-4 pt-0 mt-auto text-xs text-muted-foreground flex justify-between items-center">
        <div>
          {/* Conditionally render author information if available */}
          {article.author && (
            <span className="flex items-center">
              <User className="mr-1 h-3 w-3" /> {article.author}
            </span>
          )}
        </div>
        {/* Display the formatted publish date */}
        <span className="flex items-center">
          <Calendar className="mr-1 h-3 w-3" />
          {format(article.publishDate, 'MMM d, yyyy')}
        </span>
      </CardFooter>
    </Card>
  );
}
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { DeleteArticleButton } from './_components/DeleteArticleButton'; // Client component for delete action

// Mock data - replace with actual API calls
interface Article {
  id: string; // Assuming an ID for management
  slug: string;
  title: string;
  category: string;
  publishDate: Date;
  status: 'Published' | 'Draft'; // Example status
}

const mockArticles: Article[] = Array.from({ length: 15 }, (_, i) => ({
  id: `article-id-${i + 1}`,
  slug: `article-${i + 1}`,
  title: `Headline News Story ${i + 1}: A Deep Dive`,
  category: ['Technology', 'Politics', 'World', 'Business'][i % 4],
  publishDate: new Date(2024, 5, 20 - i),
  status: i % 4 === 0 ? 'Draft' : 'Published',
}));

async function getAdminArticles(): Promise<Article[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockArticles;
}

export default async function AdminArticlesPage() {
  const articles = await getAdminArticles();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Manage Articles</h1>
        <Link href="/admin/articles/new" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Article
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Article List</CardTitle>
          <CardDescription>View, edit, or delete published and draft articles.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No articles found.
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      <Link href={`/articles/${article.slug}`} className="hover:underline" target="_blank" title={article.title}>
                         {article.title}
                      </Link>
                     </TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>{format(article.publishDate, 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant={article.status === 'Published' ? 'default' : 'secondary'}>
                        {article.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/admin/articles/edit/${article.id}`} passHref>
                        <Button variant="outline" size="icon" aria-label="Edit Article">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      {/* Use Client Component for Delete Interaction */}
                      <DeleteArticleButton articleId={article.id} articleTitle={article.title} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       {/* Add Pagination if needed */}
    </div>
  );
}

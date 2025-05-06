import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CategoryManager } from './_components/CategoryManager';
import { DeleteCategoryButton } from './_components/DeleteCategoryButton';
import { getAllCategoriesAction } from './actions'; // Action to fetch categories

export default async function AdminCategoriesPage() {
  const result = await getAllCategoriesAction();
  const categories = result.success ? (result.data ?? []) : [];
   const error = !result.success ? result.error : null;


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Manage Categories</h1>

       {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive text-destructive rounded-md">
           <p><strong>Error loading categories:</strong> {error}</p>
         </div>
       )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Category List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Existing Categories</CardTitle>
            <CardDescription>View and delete existing categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                   <TableHead>ID</TableHead> {/* Show ID for reference */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 && !error && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No categories found. Add one using the form.
                    </TableCell>
                  </TableRow>
                )}
                 {error && (
                   <TableRow>
                     <TableCell colSpan={3} className="h-24 text-center text-destructive">
                       Could not load categories.
                     </TableCell>
                   </TableRow>
                 )}
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                     <TableCell className="text-muted-foreground text-xs">{category.id}</TableCell>
                    <TableCell className="text-right">
                      <DeleteCategoryButton categoryId={category.id} categoryName={category.name} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <CategoryManager />
        </div>
      </div>
    </div>
  );
}

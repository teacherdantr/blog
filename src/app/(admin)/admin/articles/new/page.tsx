import { ArticleForm } from '../_components/ArticleForm';
import { getAllCategoriesAction } from '../../categories/actions'; // Action to get categories

export default async function NewArticlePage() {
   const categoriesResult = await getAllCategoriesAction();
   const categories = categoriesResult.success ? categoriesResult.data ?? [] : [];


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Create New Article</h1>
       <ArticleForm mode="create" categories={categories} />
    </div>
  );
}

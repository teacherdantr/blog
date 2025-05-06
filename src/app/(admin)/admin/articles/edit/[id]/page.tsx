import { notFound } from 'next/navigation';
import { ArticleForm } from '../../_components/ArticleForm';
import { getArticleForEditAction } from '../../actions'; // Action to get article data
import { getAllCategoriesAction } from '../../../categories/actions'; // Action to get categories
import type { ArticleData } from '../../actions'; // Import type


// Mock data - replace with actual API calls
interface Category {
  id: string;
  name: string;
}


export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const articleResult = await getArticleForEditAction(params.id);
  const categoriesResult = await getAllCategoriesAction();

  if (!articleResult.success || !articleResult.data) {
     console.error("Failed to fetch article for edit:", articleResult.error);
     // Consider showing an error message instead of just notFound
    notFound();
  }

   const categories = categoriesResult.success ? categoriesResult.data ?? [] : [];


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Edit Article</h1>
       <ArticleForm
         mode="edit"
         initialData={articleResult.data}
         articleId={params.id}
         categories={categories}
       />
    </div>
  );
}

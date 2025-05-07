
import { Article, Category } from '@/lib/interfaces';
const host = process.env.NEXT_PUBLIC_APP_URL
import { ArticleCard } from '@/components/ArticleCard';
// Importing the CategorySidebar component, responsible for displaying the list of categories
// and handling category selection via URL parameters.
import CategorySidebar from '@/components/CategorySidebar';
import { PaginationComponent } from '@/components/PaginationComponent';
import MainContentWrapper from '@/components/MainContentWrapper';
export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string; category?: string };
}) {
  const { category, page } = searchParams || {};
  const currentPage = Number(page ?? 1);
  const currentCategory = category

  // Fetch articles data from the test API endpoint
  const articlesResponse = await fetch(`${host}/api/test/articles`);
  const articles: Article[] = await articlesResponse.json();

  // Fetch categories data from the test API endpoint
  const categoriesResponse = await fetch(`${host}/api/test/categories`);
  const fetchedCategories: Category[] = await categoriesResponse.json();

  // Filter articles by category if a category is selected
  const filteredArticles = currentCategory
    ? articles.filter(article => article.categoryId === currentCategory)
    : articles;

  // For now, totalPages will be 1 as we are not implementing pagination with the test data
  const totalPages = 1;

  return (
    <div className="container mx-auto px-4 py-8"> {/* Main container for the page, providing padding and centering. */}
      {/* Layout container using flexbox, arranging items in a column on small screens
          and in a row on medium and larger screens, with a gap between them. */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Render the CategorySidebar component.
            - `categories`: Pass the fetched list of categories to display in the sidebar.
            - `currentCategory`: Pass the currently selected category slug to highlight the active category in the sidebar. */}
        <CategorySidebar categories={fetchedCategories} currentCategory={currentCategory} />
        {/* Render the MainContentWrapper component. This component provides the main content area layout,
            including the title based on the current category and a container for the articles and pagination.
            - `currentCategory`: Pass the current category slug to display the appropriate title.
            - `categories`: Pass the list of categories to help the wrapper find the category name based on the slug.
            - `children`: The content inside MainContentWrapper will be rendered as its children. */}
        <MainContentWrapper currentCategory={currentCategory} categories={fetchedCategories}>
          {/* Conditionally render the grid of articles if there are any. */}
          {filteredArticles.length > 0 && ( 
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* This was line 35 */}
              {filteredArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
            </>
          )}
          {/* Conditionally render a message if no articles are found for the current category. */}
          {filteredArticles.length === 0 && (
            <p className="text-muted-foreground">No articles found for this category.</p>
          )}

          {/* Render the PaginationComponent.
              - `currentPage`: Pass the current page number to highlight the active page in the pagination controls.
              - `totalPages`: Pass the total number of pages to determine the number of pagination links.
              - `currentCategory`: Pass the current category slug so that pagination links maintain the category filter. */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            currentCategory={currentCategory}
          />
        </MainContentWrapper>
      </div>
    </div>
  );
}
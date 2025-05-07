import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Category } from '@/lib/interfaces';

interface CategorySidebarProps {
  /** An array of Category objects to be displayed in the sidebar. */
  categories: Category[];
  /** The slug of the currently active category, used to highlight the corresponding button. */
  currentCategory?: string;
}

/**
 * Renders a sidebar component displaying a list of article categories.
 * Allows users to filter articles by category by navigating to the corresponding URL.
 */
const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, currentCategory }) => {
  return (
    // The aside element serves as the container for the sidebar, controlling its width
    // based on screen size using responsive utility classes.
    <aside className="w-full md:w-1/4 lg:w-1/5">
      {/* Heading for the sidebar section. */}
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Categories</h2>
      {/* Navigation section for the category links.
          Uses flexbox for layout, wrapping on small screens and stacking vertically on medium and larger screens. */}
      <nav className="flex flex-wrap md:flex-col gap-2">
        {/* Link to display all articles. This link clears the category filter. */}
        <Link href="/" passHref>
          {/* Button for "All Articles". Its appearance changes based on whether a category is currently selected. */}
          <Button variant={!currentCategory ? 'secondary' : 'ghost'} className="w-full justify-start">
            All Articles
          </Button>
        </Link>
        {/* Map through the provided categories to create a link and button for each. */}
        {categories.map((category) => (
          // Link for a specific category. Clicking this will navigate to the homepage
          // with the category slug as a URL search parameter.
          <Link key={category.slug} href={`/?category=${category.slug}`} passHref>
            {/* Button for the specific category. Its appearance changes based on whether
                this category is the currently selected one. */}
            <Button
              variant={currentCategory === category.slug ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              {/* Display the category icon and name within the button. */}
              {category.icon && <span className="mr-2 h-4 w-4">{category.icon}</span>}
              {category.name}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default CategorySidebar;
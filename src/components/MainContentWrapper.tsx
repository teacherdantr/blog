import { Category } from '@/lib/interfaces';

interface MainContentWrapperProps {
  /** The slug of the currently selected category. Used to determine the main heading. */
  currentCategory: string | undefined;
  /** An array of Category objects. Used to find the name of the current category based on its slug. */
  categories: Category[];
  /** The content to be rendered within the main content area (e.g., article list, pagination). */
  children: React.ReactNode;
}

/**
 * MainContentWrapper component provides the main layout structure for the content area
 * of the page, including the dynamic heading based on the selected category and
 * a container for child components (like article list and pagination).
 */
const MainContentWrapper: React.FC<MainContentWrapperProps> = ({
  currentCategory,
  categories,
  children,
}) => {
  // Determine the name of the current category to display in the heading.
  // If no category is selected (currentCategory is undefined), default to 'Latest News'.
  const categoryName = currentCategory
    ? categories.find((c) => c.slug === currentCategory)?.name
    : 'Latest News';

  return (
    // The main HTML element for the content area.
    // Uses responsive utility classes to control its width relative to the sidebar.
    <main className="w-full md:w-3/4 lg:w-4/5">
      {/* Dynamic heading that displays the name of the currently selected category or 'Latest News'. */}
      <h1 className="text-3xl font-bold mb-6 text-foreground">{categoryName}</h1>
      {/* Renders the child components passed to MainContentWrapper (e.g., the list of articles and the pagination). */}
      {children}
    </main>
  );
};

export default MainContentWrapper;
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

/**
 * Props for the PaginationComponent.
 */
interface PaginationComponentProps {
  /** The currently active page number. */
  currentPage: number;
  /** The total number of pages available. */
  totalPages: number;
  /** The currently selected category slug (optional). Used to maintain the category filter during pagination. */
  currentCategory?: string;
}

/**
 * PaginationComponent renders pagination controls for navigating through pages of content.
 * It dynamically generates page links based on the current page, total pages, and optional category filter.
 */
export function PaginationComponent({
  currentPage,
  totalPages,
  currentCategory,
}: PaginationComponentProps) {
  return (
    totalPages > 1 && (
      // Render the Pagination component only if there is more than one page.
      <Pagination className="mt-8">
        <PaginationContent>
          {/* Previous Page Button */}
          <PaginationItem>
            <PaginationPrevious
              href={
                currentPage > 1
                  // Construct the URL for the previous page.
                  // If a category is selected, include it in the URL.
                  // The page number is decremented by 1.
                  // If on the first page, the href is set to '#' to disable the link.
                  ? `/?${
                      currentCategory ? `category=${currentCategory}&` : ''
                    }page=${currentPage - 1}`
                  : '#'
              }
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              // Apply disabled styling if on the first page.
              className={
                currentPage <= 1
                  ? 'pointer-events-none opacity-50'
                  : undefined
              }
            />
          </PaginationItem> {/* End Previous Page Button */}

          {/* Dynamically generated page links */}
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            const showPage =
              // Always show the first and last page.
              // Show pages that are within one position of the current page.
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1;
            // Show ellipsis if there are pages skipped, but only if there are more than 5 total pages
            // and the skipped pages are exactly two positions away from the current page.
            // This creates a "1 ... 4 5 6 ... 10" pattern for example.
            const showEllipsis =
              Math.abs(page - currentPage) === 2 && totalPages > 5;

            if (showEllipsis && page < currentPage) {
              return (
                <PaginationItem key={`ellipsis-start-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            if (showPage) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`/?${
                      currentCategory ? `category=${currentCategory}&` : ''
                    }page=${page}`}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            if (showEllipsis && page > currentPage) {
              return (
                <PaginationItem key={`ellipsis-end-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}
          <PaginationItem>
            <PaginationNext
              href={
                currentPage < totalPages
                  ? `/?${
                      currentCategory ? `category=${currentCategory}&` : ''
                    }page=${currentPage + 1}`
                  : '#'
              }
              aria-disabled={currentPage >= totalPages}
              tabIndex={currentPage >= totalPages ? -1 : undefined}
              className={
                currentPage >= totalPages
                  ? 'pointer-events-none opacity-50'
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
}
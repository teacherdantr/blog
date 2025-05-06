// Re-exporting the Home component logic for category-specific pages
// The Home component already handles category filtering via searchParams.
// Next.js route structure `/[category]/page.tsx` will automatically pass
// the `category` slug as a parameter, but we use searchParams `/?category=...`
// for filtering on the main page and linking. This keeps the UI consistent.
// We can directly reuse the Home component logic here.

// To make this route explicitly handle the category from the path if needed,
// you could modify the Home component to accept `params.category` as well,
// but using searchParams provides a more flexible and common pattern for filtering.

// For simplicity and DRY principle, we will redirect `/categories/[category]` to `/?category=[category]`
// This ensures a single source of truth for the article listing logic.

import { redirect } from 'next/navigation';

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Redirect to the homepage with the category filter applied as a query parameter.
  redirect(`/?category=${params.category}`);

  // Note: If you prefer to render the content directly on this route
  // without redirecting, you would essentially copy the content of
  // `src/app/page.tsx` here and modify it to use `params.category`
  // instead of `searchParams.category`. However, redirection is cleaner.

  // return null; // Or a loading indicator if preferred before redirect
}

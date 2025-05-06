
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';
import { MainNav } from './MainNav';
import { getAllCategoriesAction } from '@/app/(admin)/admin/categories/actions'; // Fetch categories

export async function Header() {
  const categoriesResult = await getAllCategoriesAction();
  const categories = categoriesResult.success ? categoriesResult.data ?? [] : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md dark:bg-card/80">
      <div className="container flex h-14 items-center px-4">
        {/* Mobile Nav Trigger - Shows only on small screens */}
        <div className="md:hidden">
           <MobileNav categories={categories} />
        </div>

        {/* Site Title */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Optional: Add an SVG logo here */}
            <span className="font-bold sm:inline-block text-primary">
              NewsFlash
            </span>
          </Link>
        </div>

         {/* Centered Desktop Navigation (hidden on mobile) */}
         <div className="hidden md:flex flex-1 justify-center">
           <MainNav categories={categories} />
         </div>

        {/* Right-aligned items (Theme Toggle) */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          {/* Optional: Add Search Icon/Button here */}
        </div>
      </div>
    </header>
  );
}

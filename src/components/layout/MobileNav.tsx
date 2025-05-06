
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // Import Accordion components
import { ScrollArea } from '@/components/ui/scroll-area'; // Import ScrollArea

interface Category {
  id: string;
  name: string;
  // Add slug if available for routing, assume name is used for now if not
  slug?: string;
}

interface MobileNavProps {
  categories: Category[];
}

export function MobileNav({ categories }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  const handleLinkClick = () => {
    setOpen(false); // Close sheet on link click
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden" // Only show on mobile
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 pt-12 w-[250px] sm:w-[300px]">
        <ScrollArea className="h-full pb-12 pl-6 pr-4"> {/* Added padding */}
            <SheetHeader className="text-left mb-4 pl-1"> {/* Adjust alignment and padding */}
             <SheetTitle className="text-lg font-semibold">NewsFlash</SheetTitle>
            </SheetHeader>
          <div className="flex flex-col space-y-2">
            <Link href="/" passHref>
              <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>
                Home
              </Button>
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="categories" className="border-b-0"> {/* Remove default border */}
                <AccordionTrigger className="py-2 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                   <Button variant="ghost" className="w-full justify-start p-0 hover:bg-transparent">
                      Categories
                   </Button>
                 </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="flex flex-col space-y-1 pl-4 mt-1"> {/* Indent category links */}
                    <Link href="/" passHref>
                         <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLinkClick}>
                            All Articles
                         </Button>
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/?category=${category.slug || category.name.toLowerCase()}`}
                        passHref
                      >
                         <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLinkClick}>
                           {category.name}
                         </Button>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link href="/about" passHref>
              <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>
                About
              </Button>
            </Link>
            {/* Add other mobile nav links here */}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}


import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 dark:bg-muted/20 mt-auto border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Site Name */}
          <div>
            <Link href="/" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
              NewsFlash
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              © {currentYear} NewsFlash. All rights reserved.
            </p>
          </div>

          {/* Footer Links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-sm">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            {/* Placeholder links - create actual pages later if needed */}
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

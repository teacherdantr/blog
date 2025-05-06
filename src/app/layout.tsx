
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter font
import './globals.css';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import { ThemeProvider } from '@/components/layout/ThemeProvider'; // Import ThemeProvider
import { Header } from '@/components/layout/Header'; // Import Header
import { Footer } from '@/components/layout/Footer'; // Import Footer

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' }); // Use Inter font variable

export const metadata: Metadata = {
  title: 'NewsFlash', // Updated App Name
  description: 'Your daily dose of curated news articles.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header /> {/* Add Header */}
          <main className="flex-grow">{children}</main>
          <Footer /> {/* Add Footer */}
          <Toaster /> {/* Add Toaster component */}
        </ThemeProvider>
      </body>
    </html>
  );
}


import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About | NewsFlash',
  description: 'Learn more about NewsFlash.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">About NewsFlash</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            Welcome to NewsFlash, your go-to source for curated news articles covering a wide range of topics.
            Our mission is to deliver timely and relevant information in a clean, accessible format.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Our Focus</h3>
          <p>
            We aim to provide a platform where readers can easily find articles categorized by interest, whether it's Technology, Politics, World events, or Business insights.
          </p>
           <h3 className="text-xl font-semibold mt-6 mb-2">Technology</h3>
           <p>
             This application is built using modern web technologies including Next.js, React, Tailwind CSS, and ShadCN UI components. It leverages Server Components and Server Actions for optimal performance and a seamless user experience.
           </p>
          <p className="mt-6 text-center text-muted-foreground">
            Thank you for visiting NewsFlash!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

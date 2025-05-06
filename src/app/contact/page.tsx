
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact Us | NewsFlash',
  description: 'Get in touch with NewsFlash.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none text-center">
          <p>
            For inquiries, please reach out to us via email at:
          </p>
          <p>
            <a href="mailto:contact@newsflash.example.com" className="text-accent hover:underline">
              contact@newsflash.example.com
            </a>
          </p>
          <p className="text-muted-foreground mt-4">
            (This is a placeholder page. Please replace with a real contact form or details.)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

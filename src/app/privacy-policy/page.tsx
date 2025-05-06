
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy | NewsFlash',
  description: 'NewsFlash Privacy Policy details.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>

          <p>
            Welcome to NewsFlash. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h3>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul>
             <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, that you voluntarily give to us (e.g., when contacting us - placeholder).</li>
             <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site. (This is typical for web servers, but we are not actively tracking beyond standard logs).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Use of Your Information</h3>
          <p>
            Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Respond to your comments and inquiries.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Maintain the security and operation of the Site.</li>
          </ul>

           <h3 className="text-xl font-semibold mt-6 mb-2">Disclosure of Your Information</h3>
           <p>
             We do not share, sell, rent or trade information with third parties for their commercial purposes.
           </p>


           <h3 className="text-xl font-semibold mt-6 mb-2">Security of Your Information</h3>
           <p>
             We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
           </p>

           <h3 className="text-xl font-semibold mt-6 mb-2">Policy for Children</h3>
           <p>
            We do not knowingly solicit information from or market to children under the age of 13.
           </p>

           <h3 className="text-xl font-semibold mt-6 mb-2">Changes to This Privacy Policy</h3>
            <p>
             We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <p className="mt-6 text-center text-muted-foreground">
              (This is a placeholder Privacy Policy. Consult with a legal professional to create a policy suitable for your specific needs.)
            </p>
        </CardContent>
      </Card>
    </div>
  );
}

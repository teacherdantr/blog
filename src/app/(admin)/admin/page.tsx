import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Tags } from 'lucide-react';

// Mock data - replace with actual counts from API
async function getStats() {
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
  return {
    articleCount: 15, // From mock data
    categoryCount: 4, // From mock data
  };
}


export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome to the NewsFlash admin panel. Manage your articles and categories here.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.articleCount}</div>
            <p className="text-xs text-muted-foreground">
              Published articles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categoryCount}</div>
             <p className="text-xs text-muted-foreground">
              Available categories
            </p>
          </CardContent>
        </Card>
         {/* Add more stats cards as needed */}
      </div>

       {/* Placeholder for future charts or activity logs */}
       {/* <div className="mt-8">
         <Card>
           <CardHeader>
             <CardTitle>Recent Activity</CardTitle>
             <CardDescription>Overview of recent admin actions.</CardDescription>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground">Activity log coming soon...</p>
           </CardContent>
         </Card>
       </div> */}
    </div>
  );
}

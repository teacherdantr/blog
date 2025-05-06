import type { ReactNode } from 'react';
import { DashboardNav } from '@/components/admin/DashboardNav';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <ScrollArea className="h-full">
           <DashboardNav />
        </ScrollArea>
      </Sidebar>
      <SidebarInset>
         <div className="p-4 md:p-6 lg:p-8 min-h-screen">
             {children}
         </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

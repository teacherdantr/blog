'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Tags, LogOut, Settings } from 'lucide-react'; // Added Settings icon
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { handleLogout } from '@/app/(auth)/actions'; // Import logout action

export function DashboardNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Handle exact match for dashboard, prefix match for others
    if (path === '/admin') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const onLogout = async () => {
    await handleLogout();
    // Redirect handled by middleware after logout
  }

  return (
    <>
       <SidebarHeader className="flex items-center justify-between p-2">
         <Link href="/admin" className="font-semibold text-lg text-primary">
             NewsFlash Admin
         </Link>
         <SidebarTrigger className="md:hidden" /> {/* Show trigger only on mobile */}
       </SidebarHeader>
       <Separator />
      <SidebarMenu className="flex-1 p-2">
        <SidebarMenuItem>
          <Link href="/admin" passHref legacyBehavior>
            <SidebarMenuButton
              isActive={isActive('/admin')}
              tooltip="Dashboard"
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/admin/articles" passHref legacyBehavior>
            <SidebarMenuButton
               isActive={isActive('/admin/articles')}
               tooltip="Manage Articles"
            >
              <FileText />
              <span>Articles</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/admin/categories" passHref legacyBehavior>
            <SidebarMenuButton
              isActive={isActive('/admin/categories')}
              tooltip="Manage Categories"
            >
              <Tags />
              <span>Categories</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        {/* Example: Add a Settings link if needed later
        <SidebarMenuItem>
          <Link href="/admin/settings" passHref legacyBehavior>
            <SidebarMenuButton
              isActive={isActive('/admin/settings')}
              tooltip="Settings"
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem> */}
      </SidebarMenu>
       <Separator />
      <SidebarFooter className="p-2">
        <Button variant="ghost" onClick={onLogout} className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
      </SidebarFooter>
    </>
  );
}

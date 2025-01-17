"use client";

import { Clock, FileBarChart, type LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function NavAnalytics({
  analytics,
}: {
  analytics: {
    title: string;
    href: string;
    icon?: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();
  const t = useTranslations("NavAnalytics");

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t("title")}</SidebarGroupLabel>
      <SidebarMenu>
        {analytics.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.href}>
                <item.icon />
                <span>{t(item.title)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

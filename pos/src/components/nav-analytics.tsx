"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  // useSidebar,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, NamespaceKeys } from "next-intl";
import clsx from "clsx";

type ValidHref =
  | "/"
  | "/dashboard/products"
  | "/dashboard/uom"
  | "/dashboard/product-ledger"
  | "/dashboard/product-discount"
  | "/dashboard/product-group"
  | "/dashboard/family"
  | "/dashboard/season";

type NavLinkKeys = NamespaceKeys<typeof NavAnalytics, "NavAnalytics">;

export function NavAnalytics({
  analytics,
}: {
  analytics: {
    title: string;
    href: ValidHref;
    icon?: LucideIcon;
  }[];
}) {
  // const { isMobile } = useSidebar();
  const t = useTranslations("NavAnalytics");
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t("title")}</SidebarGroupLabel>
      <SidebarMenu>
        {analytics.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link
                key={item.title as NavLinkKeys}
                href={item.href}
                className={clsx(
                  "flex w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    "bg-sky-100 text-blue-600": pathname === item.href,
                  }
                )}
              >
                {item.icon && <item.icon />}
                <span>{t(item.title as NavLinkKeys)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

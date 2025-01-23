"use client";

import { ChevronRight, Home, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/routing";
import { useTranslations, NamespaceKeys } from "next-intl";
import { usePathname } from "@/i18n/routing";
import clsx from "clsx";
import { ValidHref } from "@/types/routes";

type NavLinkKeys = NamespaceKeys<typeof NavMain, "NavMain">;

export function NavMain({
  items,
}: {
  items: {
    title: NavLinkKeys;
    // href?: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: NavLinkKeys;
      href: ValidHref;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  const t = useTranslations("NavMain");
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>POS</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Home />
            <Link
              key={t("home")}
              href="/"
              className={clsx(
                "flex w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "bg-sky-100 text-blue-600": pathname === "/",
                }
              )}
            >
              <span>{t("home")}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {/* <Link
                    key={item.title}
                    href={item.href}
                    className="flex w-full"
                  > */}
                  {item.icon && <item.icon />}
                  <span>{t(item.title)}</span>
                  {/* </Link> */}
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className={clsx(
                            "flex w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                              "bg-sky-100 text-blue-600":
                                pathname === subItem.href,
                            }
                          )}
                        >
                          {subItem.icon && <subItem.icon />}
                          <span>{t(subItem.title)}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

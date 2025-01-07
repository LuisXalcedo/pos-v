import { Home, Power, HandCoins, Settings, Users } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function NavLinks() {
  const t = useTranslations("NavLinks");

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu></DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>Point of Sale</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem key={"home"}>
              <SidebarMenuButton>
                <Home />

                <Link href="/">{t("home")}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem key={"salesperson"}>
              <SidebarMenuButton>
                <Users />
                <Link href="/dashboard/salespersons">{t("salesperson")}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem key={"logout"}>
              <SidebarMenuButton asChild>
                <a href="/logout">
                  <Power />
                  <span>{t("logout")}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem key={"settings"}>
              <SidebarMenuButton>
                <Settings />
                <Link href="/settings">{t("settings")}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

"use client";

import { NavMain } from "./nav-main";
import { NavAnalytics } from "./nav-analytics";
import {
  Sidebar,
  SidebarContent,
  // SidebarHeader,
  // SidebarFooter,
  // SidebarRail,
} from "@/components/ui/sidebar";
import {
  Package,
  Scale,
  FolderTree,
  Tags,
  Sun,
  Tag,
  FileSpreadsheet,
  PieChart,
  Users,
  UserCircle,
  UsersRound,
  Clock,
  FileBarChart,
} from "lucide-react";

import React from "react";
import { LucideIcon } from "lucide-react";
import { ValidHref } from "@/types/routes";
import { NamespaceKeys } from "next-intl";

type NavLinkKeys = NamespaceKeys<typeof NavAnalytics, "NavAnalytics">;

interface NavItem {
  title: NavLinkKeys;
  icon?: LucideIcon;
  href: ValidHref;
  isActive?: boolean;
  items?: NavItem[];
}

const navItems: { navMain: NavItem[]; analytics: NavItem[] } = {
  navMain: [
    // {
    //   title: "home",
    //   icon: Home,
    //   href: "/",
    // },
    {
      title: "products" as NavLinkKeys,
      icon: Package,
      href: "/dashboard/products",
      isActive: true,
      items: [
        {
          title: "products" as NavLinkKeys,
          icon: Package,
          href: "/dashboard/products",
          // badge: "1.2.3",
        },
        {
          title: "unit_of_measure" as NavLinkKeys,
          icon: Scale,
          href: "/dashboard/uom",
        },
        {
          title: "product_group" as NavLinkKeys,
          icon: FolderTree,
          href: "/dashboard/product-group",
        },
        {
          title: "family" as NavLinkKeys,
          icon: Tags,
          href: "/dashboard/family",
        },
        {
          title: "season" as NavLinkKeys,
          icon: Sun,
          href: "/dashboard/season",
        },
        {
          title: "product_discount" as NavLinkKeys,
          icon: Tag,
          href: "/dashboard/product-discount",
        },
        {
          title: "product_ledger_entries" as NavLinkKeys,
          icon: FileSpreadsheet,
          href: "/dashboard/product-ledger",
        },
      ],
    },
    {
      title: "sales" as NavLinkKeys,
      icon: PieChart,
      href: "/dashboard/customers",
      isActive: true,
      items: [
        {
          title: "customers" as NavLinkKeys,
          icon: Users,
          href: "/dashboard/customers",
          // badge: "3.4.5",
        },
        {
          title: "salesperson" as NavLinkKeys,
          icon: UserCircle,
          href: "/dashboard/salespersons",
        },
        {
          title: "customer_group" as NavLinkKeys,
          icon: UsersRound,
          href: "/dashboard/customer-group",
        },
        {
          title: "customer_discount" as NavLinkKeys,
          icon: Tag,
          href: "/dashboard/customer-discount",
        },
        {
          title: "customer_ledger_entries" as NavLinkKeys,
          icon: FileSpreadsheet,
          href: "/dashboard/customer-ledger",
        },
      ],
    },
  ],
  analytics: [
    {
      title: "end_of_day" as NavLinkKeys,
      icon: Clock,
      href: "/dashboard/end-of-day",
    },
    {
      title: "report_x" as NavLinkKeys,
      icon: FileBarChart,
      href: "/dashboard/report-x",
    },
    {
      title: "report_z" as NavLinkKeys,
      icon: FileBarChart,
      href: "/dashboard/report-z",
    },
  ],
};

export function NavLinks({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <NavMain items={navItems.navMain} />
        <NavAnalytics analytics={navItems.analytics} />
      </SidebarContent>
    </Sidebar>
  );
}

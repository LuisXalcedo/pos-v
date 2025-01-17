"use client";

import { NavMain } from "./nav-main";
import { NavAnalytics } from "./nav-analytics";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
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

const navItems = {
  // {
  //   title: "home",
  //   icon: Home,
  //   href: "/",
  // },
  // {
  navMain: [
    {
      title: "products",
      icon: Package,
      href: "/dashboard/products",
      isActive: true,
      items: [
        {
          title: "products",
          icon: Package,
          href: "/dashboard/products",
          // badge: "1.2.3",
        },
        {
          title: "unit_of_measure",
          icon: Scale,
          href: "/dashboard/uom",
        },
        {
          title: "product_group",
          icon: FolderTree,
          href: "/dashboard/product-group",
        },
        {
          title: "family",
          icon: Tags,
          href: "/dashboard/family",
        },
        {
          title: "season",
          icon: Sun,
          href: "/dashboard/season",
        },
        {
          title: "product_discount",
          icon: Tag,
          href: "/dashboard/product-discount",
        },
        {
          title: "product_ledger_entries",
          icon: FileSpreadsheet,
          href: "/dashboard/product-ledger",
        },
      ],
    },
    {
      title: "sales",
      icon: PieChart,
      href: "/dashboard/customers",
      isActive: true,
      items: [
        {
          title: "customers",
          icon: Users,
          href: "/dashboard/customers",
          // badge: "3.4.5",
        },
        {
          title: "salesperson",
          icon: UserCircle,
          href: "/dashboard/salespersons",
        },
        {
          title: "customer_group",
          icon: UsersRound,
          href: "/dashboard/customer-group",
        },
        {
          title: "customer_discount",
          icon: Tag,
          href: "/dashboard/customer-discount",
        },
        {
          title: "customer_ledger_entries",
          icon: FileSpreadsheet,
          href: "/dashboard/customer-ledger",
        },
      ],
    },
  ],
  analytics: [
    {
      title: "end_of_day",
      icon: Clock,
      href: "/dashboard/end-of-day",
    },
    {
      title: "report_x",
      icon: FileBarChart,
      href: "/dashboard/report-x",
    },
    {
      title: "report_z",
      icon: FileBarChart,
      href: "/dashboard/report-z",
    },
  ],
};

export function NavLinks({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navItems.navMain} />
        <NavAnalytics analytics={navItems.analytics} />
      </SidebarContent>
    </Sidebar>
  );
}

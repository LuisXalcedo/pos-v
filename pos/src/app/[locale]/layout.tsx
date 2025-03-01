import { NextIntlClientProvider, Locale, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import "../globals.css";

import { cookies } from "next/headers";

import { exo } from "@/components/ui/fonts";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavLinks } from "@/components/nav-links";

// export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "Green Retail",
  description: "Point of Sale by Green Retail",
  keywords: ["Retail", "Point of Sale"],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = await params;
  const cookiesStore = await cookies();
  const defaultOpen = cookiesStore.get("sidebar:state")?.value === "true";

  //Ensure that the incoming locale is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  //Providing all messages to the client
  //side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${exo.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <NavLinks />
            <main>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

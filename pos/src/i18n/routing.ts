import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // Used when no locale matches
  defaultLocale: "en",

  localePrefix: "always",

  pathnames: {
    "/": {
      en: "/",
      es: "/",
    },
    "/dashboard/salespersons": {
      en: "/dashboard/salespersons",
      es: "/tablero/vendedores",
    },
    "/dashboard/salespersons/create": {
      en: "/dashboard/salespersons/create",
      es: "/tablero/vendedores/crear",
    },
    "/dashboard/salespersons/[id]/edit": {
      en: "/dashboard/salespersons/[id]/edit",
      es: "/tablero/vendedores/[id]/editar",
    },
    "/dashboard/salespersons/[id]/delete": {
      en: "/dashboard/salespersons/[id]/delete",
      es: "/tablero/vendedores/[id]/borrar",
    },
    "/login": {
      en: "/login",
      es: "/iniciar-sesion",
    },
    "/logout": {
      en: "/logout",
      es: "/cerrar-sesion",
    },
    "/settings": {
      en: "/settings",
      es: "/configuracion",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

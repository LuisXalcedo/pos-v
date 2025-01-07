"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  defaultValue: string;
  label: string;
  locales: string[];
  translations: Record<string, string>;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  label,
  locales,
  translations,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale as Locale }
      );
    });
  }

  return (
    <div className="relative">
      <Select
        defaultValue={defaultValue}
        onValueChange={onSelectChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {translations[locale]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

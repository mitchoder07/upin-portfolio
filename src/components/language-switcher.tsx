"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { locales, localeMeta, type Locale } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();
  const current = localeMeta[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-foreground/5"
          aria-label="Switch language"
          data-cursor="pointer"
        >
          <Globe className="h-[1rem] w-[1rem] text-[var(--neon)]" />
          {!compact && (
            <span className="hidden text-xs font-medium tracking-wide sm:inline">
              {current.flag}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[180px] max-h-[320px] overflow-y-auto"
      >
        <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          7 Languages
        </div>
        {locales.map((loc: Locale) => {
          const meta = localeMeta[loc];
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => setLocale(loc)}
              className="flex cursor-pointer items-center justify-between gap-3 py-2"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold text-[var(--neon)]">
                  {meta.flag}
                </span>
                <span className="text-sm">{meta.nativeLabel}</span>
              </div>
              {loc === locale && (
                <Check className="h-3.5 w-3.5 text-[var(--neon)]" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, useContext, useMemo, useState, type ComponentProps } from "react";

type SiteTheme = "light" | "dark";
const SiteThemeContext = createContext<{
  resolvedTheme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
} | null>(null);

export function useSiteTheme() {
  const theme = useContext(SiteThemeContext);
  if (!theme) throw new Error("The theme switch needs the site theme provider.");
  return theme;
}

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  // Start every document in light mode, including browsers with an old saved
  // dark preference. A deliberate switch lasts through client-side navigation;
  // refreshing starts in light mode again. Do not use OS or saved preferences.
  const [theme, setTheme] = useState<SiteTheme>("light");
  const value = useMemo(() => ({ resolvedTheme: theme, setTheme }), [theme]);
  return (
    <SiteThemeContext.Provider value={value}>
      <NextThemesProvider {...props} defaultTheme="light" enableSystem={false} forcedTheme={theme}>
        {children}
      </NextThemesProvider>
    </SiteThemeContext.Provider>
  );
}

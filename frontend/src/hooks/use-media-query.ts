import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    setMatches(mql.matches);
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return matches;
};

/** Мобильная версия: ширина экрана меньше 1280px */
export const useIsMobile = (): boolean => useMediaQuery("(max-width: 1279px)");

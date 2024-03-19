import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function useMounted() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = isDarkMode ? 'dark' : 'light';
      setTheme(defaultTheme);
    }

    setMounted(true);
  }, [setTheme]);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return mounted;
}

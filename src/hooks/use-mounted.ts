import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function useMounted() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const themeSet = localStorage.getItem('themeSet');

    if (!themeSet) {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
      
      localStorage.setItem('themeSet', 'true');
    }
    
    setMounted(true);
  }, [setTheme]);

  return mounted;
}

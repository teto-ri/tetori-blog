'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const COMMENT_THEME = {
  light: 'github-light',
  dark: 'github-dark'
};

const Comment = () => {
  const [container, setContainer] = useState<Element | null>(null);
  const { theme } = useTheme();
  useEffect(() => {
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.setAttribute('data-repo', 'teto-ri/tetori-blog');
    script.setAttribute('data-repo-id', 'R_kgDOLh4jfg');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOLh4jfs4CeEVd');
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', `${theme}`);
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');
    container.appendChild(script);
  }, [container]);

  useEffect(() => {
    if (!container) return;

    const message = theme;
    const commentIframe = container.querySelector('iframe');

    commentIframe?.contentWindow?.postMessage(message, 'https://giscus.app');
  }, [theme]);

  useEffect(() => {
    return () => {
      const style = document.head.getElementsByTagName('style')[0];
      if (style.innerHTML.includes('giscus')) {
        style.remove();
      }
    };
  }, []);

  return <div className="comment-container" ref={setContainer} />;
};

export default Comment;
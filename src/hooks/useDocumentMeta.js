import { useEffect } from 'react';

const SUFFIX = '408-DS Interactive DSA';
const DEFAULT_DESC =
  'Interactive visualizations of data structures and algorithms with step-by-step animations and C, Python & JavaScript code.';

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Updates document.title and the meta description for the current view.
 * Even with hash-based routing this keeps the title accurate for browser
 * tabs, history, bookmarks and link previews.
 */
export default function useDocumentMeta(title, description = DEFAULT_DESC) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} - ${SUFFIX}` : SUFFIX;
    setMeta('description', description);
    return () => {
      document.title = prev;
    };
  }, [title, description]);
}

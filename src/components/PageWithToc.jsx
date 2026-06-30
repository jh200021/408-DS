import React, { useRef, useEffect, useState } from 'react';

// Scroll-spy: returns the id of the section currently nearest the top of the
// scroll container. `rootRef` is the scrolling element; `ids` are section ids.
function useScrollSpy(ids, rootRef) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onScroll = () => {
      // If we're at the very bottom, the last section is the active one.
      if (root.scrollTop + root.clientHeight >= root.scrollHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }
      const line = root.getBoundingClientRect().top + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    onScroll();
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, rootRef]);

  return active;
}

export default function PageWithToc({ sections, children }) {
  const scrollRef = useRef(null);
  const active = useScrollSpy(sections.map(s => s.id), scrollRef);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="cg-page" ref={scrollRef}>
      <div className="cg-shell">
        <nav className="cg-toc" aria-label="Table of contents">
          <div className="cg-toc-title">On this page</div>
          <ul className="cg-toc-list">
            {sections.map(s => (
              <li key={s.id}>
                <button
                  className={`cg-toc-link${active === s.id ? ' active' : ''}`}
                  onClick={() => go(s.id)}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="cg-content">{children}</div>
      </div>
    </div>
  );
}

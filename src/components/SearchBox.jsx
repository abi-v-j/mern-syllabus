import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';
import { useSearch } from '../hooks/useSearch.js';
import { popularSearches } from '../utils/searchEngine.js';

function SearchBox({ onNavigate }) {
  const navigate = useNavigate();
  const { courses } = usePortal();
  const [query, setQuery] = useState('');
  const results = useSearch(courses, query, { limit: 8 });

  const openPath = (path) => {
    navigate(path);
    onNavigate?.();
    setQuery('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim()) {
      openPath(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="global-search" className="sr-only">
          Search courses and topics
        </label>
        <Search
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
        />
        <input
          id="global-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics or tools"
          className="h-11 w-full rounded-md border border-[var(--border)] bg-[var(--surface-strong)] pl-11 pr-4 text-sm font-medium text-[var(--text-main)] placeholder:text-[var(--text-faint)]"
        />
      </form>

      {query && (
        <div className="surface absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 rounded-lg p-2">
          {results.length > 0 ? (
            <>
              <div className="grid gap-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => openPath(result.path)}
                    className="rounded-md px-4 py-3 text-left transition hover:bg-[var(--brand-soft)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[var(--text-main)]">{result.title}</p>
                        <p className="text-sm text-[var(--text-soft)]">{result.subtitle}</p>
                      </div>
                      <span className="pill mt-1">{result.type}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                      {result.snippet}
                    </p>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => openPath(`/search?q=${encodeURIComponent(query.trim())}`)}
                className="btn-secondary mt-3 w-full"
              >
                See all search results
              </button>
            </>
          ) : (
            <div className="grid gap-3 rounded-md px-4 py-5 text-sm text-[var(--text-soft)]">
              <div className="flex items-center gap-3">
                <Sparkles size={16} className="text-emerald-500" />
                No quick match yet. Try one of these searches.
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.slice(0, 4).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => openPath(`/search?q=${encodeURIComponent(item)}`)}
                    className="pill transition hover:border-emerald-500/40 hover:bg-emerald-500/5"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;

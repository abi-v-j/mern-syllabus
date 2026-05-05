import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';
import { useSearch } from '../hooks/useSearch.js';

function SearchBox({ onNavigate }) {
  const navigate = useNavigate();
  const { courses } = usePortal();
  const [query, setQuery] = useState('');
  const results = useSearch(courses, query);

  const handleSelect = (result) => {
    if (result.type === 'course') {
      navigate(`/tutorials/${result.courseId}`);
      onNavigate?.();
      setQuery('');
      return;
    }

    navigate(`/tutorials/${result.courseId}/${result.topicId}`);
    onNavigate?.();
    setQuery('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (results[0]) {
      handleSelect(results[0]);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search courses or topics..."
          className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] pl-11 pr-4 text-sm text-[var(--text-main)] placeholder:text-[var(--text-faint)]"
        />
      </form>

      {query && (
        <div className="surface absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 rounded-3xl p-3">
          {results.length > 0 ? (
            <div className="grid gap-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.courseId}-${result.topicId ?? 'course'}`}
                  type="button"
                  onClick={() => handleSelect(result)}
                  className="flex items-start justify-between rounded-2xl px-4 py-3 text-left transition hover:bg-emerald-500/10"
                >
                  <div>
                    <p className="font-semibold text-[var(--text-main)]">{result.title}</p>
                    <p className="text-sm text-[var(--text-soft)]">{result.subtitle}</p>
                  </div>
                  <span className="pill mt-1">{result.type}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl px-4 py-5 text-sm text-[var(--text-soft)]">
              <Sparkles size={16} className="text-emerald-500" />
              No matches yet. Try a course name like React or a topic like JWT.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;

import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';
import { useSearch } from '../hooks/useSearch.js';
import { popularSearches } from '../utils/searchEngine.js';

const filterOptions = [
  { value: 'all', label: 'All results' },
  { value: 'topic', label: 'Topics' },
  { value: 'course', label: 'Courses' },
];

function SearchResultsContent({ initialQuery, initialType }) {
  const { courses } = usePortal();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? initialQuery;
  const type = searchParams.get('type') ?? initialType;
  const [draft, setDraft] = useState(() => initialQuery);
  const results = useSearch(courses, query, { limit: 40, type });

  const runSearch = (nextQuery, nextType = type) => {
    const trimmed = nextQuery.trim();

    if (!trimmed) {
      setDraft('');
      setSearchParams({});
      return;
    }

    setDraft(trimmed);
    setSearchParams({
      q: trimmed,
      ...(nextType !== 'all' ? { type: nextType } : {}),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runSearch(draft);
  };

  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card overflow-hidden">
        <div className="relative">
          <p className="eyebrow">Smart search</p>
          <h1 className="headline mt-4 text-4xl font-bold">Find the exact MERN lesson you need</h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--text-soft)]">
            Search by concept, library, package, or project need. Results are ranked across the full
            zero-to-hero roadmap so topics like Tailwind CSS, Passport.js, BullMQ, and Socket.IO
            surface quickly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]"
          >
            <label className="relative block">
              <span className="sr-only">Search the MERN syllabus</span>
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
              />
              <input
                type="search"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Search React Router, Tailwind CSS, Redis, Passport.js..."
                className="h-12 w-full rounded-md border border-[var(--border)] bg-[var(--surface-strong)] pl-11 pr-4 text-sm text-[var(--text-main)] placeholder:text-[var(--text-faint)]"
              />
            </label>
            <button type="submit" className="btn-primary">
              Search now
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => runSearch(item)}
                className="pill transition hover:border-emerald-500/40 hover:bg-emerald-500/5"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="section-card h-fit">
          <p className="eyebrow">Filters</p>
          <div className="mt-5 grid gap-3">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => runSearch(query, option.value)}
                className={type === option.value ? 'btn-primary w-full' : 'btn-secondary w-full'}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-7 text-[var(--text-soft)]">
            Search understands course names, topic titles, and aliases like `jwt`, `mui`, `socket
            io`, `body-parser`, and `jsonwebtocken`.
          </div>
        </aside>

        <div className="grid gap-5">
          {query ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Results</p>
                <h2 className="headline mt-3 text-3xl font-bold">
                  {results.length} matches for “{query}”
                </h2>
              </div>
              <Link to="/assistant" className="btn-secondary">
                Need an answer instead?
              </Link>
            </div>
          ) : (
            <div className="section-card">
              <p className="eyebrow">Try these searches</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => runSearch(item)}
                    className="surface-soft p-4 text-left text-sm text-[var(--text-soft)] transition hover:border-emerald-500/30 hover:bg-emerald-500/5"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="section-card flex items-start gap-3">
              <Sparkles size={18} className="mt-1 text-emerald-500" />
              <div>
                <h3 className="font-display text-2xl font-bold text-[var(--text-main)]">
                  No matching lesson yet
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                  Try a shorter query or search by package name, feature, or concept. Good examples:
                  `jsonwebtoken`, `Framer Motion`, `Socket.IO`, `Redis`, or `MERN roadmap`.
                </p>
              </div>
            </div>
          )}

          {results.map((result) => (
            <article key={result.id} className="section-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap gap-2">
                    <span className="eyebrow">{result.type === 'topic' ? 'Topic' : 'Course'}</span>
                    <span className="pill">{result.stageTitle}</span>
                    <span className="pill">{result.level}</span>
                  </div>
                  <h3 className="headline mt-4 text-3xl font-bold">{result.title}</h3>
                  <p className="mt-3 text-sm font-medium text-[var(--text-main)]/80">
                    {result.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{result.snippet}</p>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
                    {result.matchReason}
                  </p>
                </div>

                <Link to={result.path} className="btn-primary">
                  Open lesson
                  <ArrowRight size={16} />
                </Link>
              </div>

              {result.keywords.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {result.keywords.map((keyword) => (
                    <span key={`${result.id}-${keyword}`} className="pill">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function SearchResults() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const initialType = searchParams.get('type') ?? 'all';

  return (
    <SearchResultsContent
      key={`${initialQuery}:${initialType}`}
      initialQuery={initialQuery}
      initialType={initialType}
    />
  );
}

export default SearchResults;

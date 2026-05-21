import { useState } from 'react';
import { Bookmark, CheckCircle2, ChevronRight, Search, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';

function Sidebar({ course, currentTopicId, isOpen, onClose }) {
  const { isTopicBookmarked, isTopicCompleted, completedTopics } = usePortal();
  const [filter, setFilter] = useState('');
  const completedCount = course.topics.filter(
    (topic) => completedTopics[`${course.courseId}::${topic.topicId}`],
  ).length;
  const completionPercent = Math.round((completedCount / course.topics.length) * 100);
  const activeTopic =
    course.topics.find((topic) => topic.topicId === currentTopicId) ?? course.topics[0];
  const visibleTopics = course.topics
    .map((topic, index) => ({ ...topic, position: index + 1 }))
    .filter((topic) => topic.topicTitle.toLowerCase().includes(filter.trim().toLowerCase()));

  return (
    <>
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden"
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[86vw] max-w-sm border-r border-[var(--border)] bg-[var(--surface-strong)] p-4 transition duration-300 lg:sticky lg:top-[calc(var(--portal-header-height)+0.75rem)] lg:bottom-auto lg:left-auto lg:inset-y-auto lg:z-10 lg:h-[calc(100vh-var(--portal-header-height)-1.25rem)] lg:w-full lg:max-w-none lg:self-start lg:rounded-lg lg:border lg:bg-[var(--surface)] lg:shadow-float lg:backdrop-blur-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col gap-4">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--brand-soft)] font-display text-xs font-bold tracking-[0.14em] text-[var(--brand-strong)]">
                  {course.icon}
                </span>
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                    Course roadmap
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-soft)]">{course.label}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary lg:hidden"
                aria-label="Close course topics"
              >
                <X size={16} />
              </button>
            </div>

            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-[var(--text-main)]">
              {course.courseTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              Follow the topics in order, or jump to the lesson you need.
            </p>

            <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
              <div className="flex items-center justify-between text-sm font-medium text-[var(--text-soft)]">
                <span>Progress</span>
                <span>{completionPercent}%</span>
              </div>
              <div className="mt-3 h-2.5 rounded-full bg-slate-200/90 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="pill">
                  {completedCount}/{course.topics.length} completed
                </span>
                <span className="pill">{course.stageBadge}</span>
                <span className="pill">{course.level}</span>
              </div>
              <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-[var(--text-soft)]">
                <Sparkles size={13} className="mt-0.5 shrink-0 text-emerald-500" />
                <span>Current: {activeTopic.topicTitle}</span>
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <Link to="/tutorials" className="btn-secondary !rounded-md !px-3 !py-2 text-xs">
                All courses
              </Link>
              <Link
                to={`/tutorials/${course.courseId}`}
                className="btn-secondary !rounded-md !px-3 !py-2 text-xs"
                onClick={onClose}
              >
                Course intro
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)]/85 p-4">
            <label
              htmlFor="sidebar-topic-filter"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-faint)]"
            >
              Find a topic
            </label>
            <div className="relative mt-3">
              <Search
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
              />
              <input
                id="sidebar-topic-filter"
                type="text"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Search topics"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 text-sm text-[var(--text-main)] placeholder:text-[var(--text-faint)]"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-faint)]">
              <span>{visibleTopics.length} topics shown</span>
              <span>
                Lesson{' '}
                {course.topics.findIndex((topic) => topic.topicId === activeTopic.topicId) + 1}
              </span>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="px-1 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-faint)]">
              <span>Course topics</span>
            </div>

            <div className="min-h-0 space-y-2 overflow-y-auto pb-4 pr-1">
              {visibleTopics.length > 0 ? (
                visibleTopics.map((topic) => {
                  const isActive = currentTopicId === topic.topicId;
                  const completed = isTopicCompleted(course.courseId, topic.topicId);
                  const bookmarked = isTopicBookmarked(course.courseId, topic.topicId);

                  return (
                    <Link
                      key={topic.topicId}
                      to={`/tutorials/${course.courseId}/${topic.topicId}`}
                      onClick={onClose}
                      className={`group relative block overflow-hidden rounded-lg border px-3 py-3 transition ${
                        isActive
                          ? 'border-emerald-500/35 bg-emerald-500/10 shadow-lg shadow-emerald-950/5'
                          : 'border-[var(--border)] bg-transparent hover:border-emerald-500/25 hover:bg-emerald-500/5'
                      }`}
                    >
                      <span
                        className={`absolute bottom-3 left-0 top-3 w-1 rounded-r-full ${
                          isActive
                            ? 'bg-emerald-500'
                            : 'bg-transparent group-hover:bg-emerald-500/35'
                        }`}
                        aria-hidden="true"
                      />

                      <div className="flex items-start gap-3 pl-2">
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-md text-sm font-bold ${
                            completed
                              ? 'bg-emerald-500 text-white'
                              : isActive
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-200'
                                : 'bg-[var(--surface)] text-[var(--text-faint)]'
                          }`}
                        >
                          {completed ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            String(topic.position).padStart(2, '0')
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-semibold leading-6 text-[var(--text-main)]">
                              {topic.topicTitle}
                            </p>
                            <ChevronRight
                              size={16}
                              className={`mt-1 shrink-0 text-[var(--text-faint)] transition ${
                                isActive
                                  ? 'translate-x-0 text-emerald-500'
                                  : 'group-hover:translate-x-0.5'
                              }`}
                            />
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                            <span className="pill">{topic.estimatedMinutes} min</span>
                            {isActive && (
                              <span className="rounded-md bg-[var(--brand-soft)] px-3 py-1 font-medium text-[var(--brand-strong)]">
                                Current lesson
                              </span>
                            )}
                            {completed && (
                              <span className="rounded-md bg-[var(--brand-soft)] px-3 py-1 font-medium text-[var(--brand-strong)]">
                                Done
                              </span>
                            )}
                            {bookmarked && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-[var(--accent-soft)] px-3 py-1 font-medium text-[var(--accent)]">
                                <Bookmark size={12} />
                                Saved
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="rounded-lg border border-dashed border-[var(--border)] p-5 text-sm leading-7 text-[var(--text-soft)]">
                  No topics match that search yet. Try a shorter word like React, API, or Grid.
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

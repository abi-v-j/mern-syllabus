import {
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Layers3,
} from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';
import { buildTopicKey, countCompletedTopics } from '../utils/navigation.js';

function CourseOverview() {
  const { course } = useOutletContext();
  const { completedTopics, bookmarkedTopics, isTopicCompleted } = usePortal();
  const completedCount = countCompletedTopics(course, completedTopics);
  const firstIncompleteTopic =
    course.topics.find((topic) => !isTopicCompleted(course.courseId, topic.topicId)) ??
    course.topics[0];
  const bookmarkCount = course.topics.filter((topic) =>
    bookmarkedTopics.includes(buildTopicKey(course.courseId, topic.topicId)),
  ).length;

  return (
    <main className="grid gap-6">
      <section className="section-card overflow-hidden">
        <div className="relative">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-faint)]">
            <Link to="/" className="hover:text-emerald-600">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/tutorials" className="hover:text-emerald-600">
              Tutorials
            </Link>
            <ChevronRight size={14} />
            <span>{course.courseTitle}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2">
                <span className="eyebrow">{course.label}</span>
                <span className="pill">{course.stageBadge}</span>
                <span className="pill">{course.level}</span>
                <span className="pill">{course.estimatedHours} hr path</span>
              </div>
              <h1 className="headline mt-4 text-4xl font-bold">{course.courseTitle}</h1>
              <p className="mt-4 text-base leading-8 text-[var(--text-main)]/90">
                {course.courseDescription}
              </p>
              <p className="mt-4 text-sm leading-8 text-[var(--text-soft)]">{course.focus}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="surface-soft p-4">
                <p className="text-sm text-[var(--text-soft)]">Topics</p>
                <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                  {course.topics.length}
                </p>
              </div>
              <div className="surface-soft p-4">
                <p className="text-sm text-[var(--text-soft)]">Bookmarked</p>
                <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                  {bookmarkCount}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/tutorials/${course.courseId}/${firstIncompleteTopic.topicId}`}
              className="btn-primary"
            >
              Continue course
              <ArrowRight size={16} />
            </Link>
            <Link
              to={`/assistant?q=${encodeURIComponent(`How do I learn ${course.courseTitle}?`)}`}
              className="btn-secondary"
            >
              Ask AI guide
            </Link>
            <div className="btn-secondary !cursor-default">
              <CheckCircle2 size={16} />
              {completedCount} completed
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="section-card">
          <p className="eyebrow">Prerequisites</p>
          <div className="mt-5 grid gap-3">
            {course.prerequisites.map((item) => (
              <div key={item} className="surface-soft p-4 text-sm text-[var(--text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">What you will get</p>
          <div className="mt-5 grid gap-3">
            {course.outcomes.map((item) => (
              <div key={item} className="surface-soft p-4 text-sm text-[var(--text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">Main tools</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {course.tools.map((tool) => (
              <span key={tool} className="pill">
                {tool}
              </span>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--brand-soft)] p-4 text-sm leading-7 text-[var(--text-soft)]">
            <strong className="text-[var(--text-main)]">Build focus:</strong> {course.buildProject}
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="section-card">
          <p className="eyebrow">How to study this track</p>
          <div className="mt-5 grid gap-4">
            <div className="surface-soft p-4">
              Move topic by topic in order first, then use search and bookmarks for revision.
            </div>
            <div className="surface-soft p-4">
              Copy the code example, edit it, and finish the practice task before marking a lesson
              complete.
            </div>
            <div className="surface-soft p-4">
              Ask the AI guide whenever you want a simplified explanation or the next recommended
              lesson.
            </div>
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">Course snapshot</p>
          <div className="mt-5 grid gap-3">
            <div className="surface-soft flex items-center gap-3 p-4">
              <BookOpen size={18} className="text-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">{course.stageTitle}</p>
                <p className="text-xs text-[var(--text-soft)]">Roadmap phase</p>
              </div>
            </div>
            <div className="surface-soft flex items-center gap-3 p-4">
              <Layers3 size={18} className="text-sky-500" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">{course.level}</p>
                <p className="text-xs text-[var(--text-soft)]">Recommended skill level</p>
              </div>
            </div>
            <div className="surface-soft flex items-center gap-3 p-4">
              <Clock3 size={18} className="text-amber-500" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">
                  {course.totalMinutes} minutes
                </p>
                <p className="text-xs text-[var(--text-soft)]">Approximate focused study time</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="section-card">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Topic roadmap</p>
            <h2 className="headline mt-4 text-3xl font-bold">Every lesson in this course</h2>
          </div>
          <div className="pill inline-flex items-center gap-2">
            <BookOpen size={14} />
            Course sequence
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {course.topics.map((topic, index) => (
            <Link
              key={topic.topicId}
              to={`/tutorials/${course.courseId}/${topic.topicId}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[var(--border)] px-4 py-4 transition hover:border-emerald-500/30 hover:bg-emerald-500/5"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--brand-soft)] text-sm font-bold text-[var(--brand-strong)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-semibold text-[var(--text-main)]">{topic.topicTitle}</p>
                  <p className="text-sm text-[var(--text-soft)]">{topic.learningOutcome}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[var(--text-soft)]">
                <span className="pill">{topic.estimatedMinutes} min</span>
                {bookmarkedTopics.includes(buildTopicKey(course.courseId, topic.topicId)) && (
                  <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-300">
                    <Bookmark size={14} />
                    saved
                  </span>
                )}
                {isTopicCompleted(course.courseId, topic.topicId) && (
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-300">
                    <CheckCircle2 size={14} />
                    completed
                  </span>
                )}
                <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CourseOverview;

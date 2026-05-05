import { ArrowRight, Bookmark, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';
import { buildTopicKey, countCompletedTopics } from '../utils/navigation.js';

function CourseOverview() {
  const { course } = useOutletContext();
  const { completedTopics, bookmarkedTopics, isTopicCompleted } = usePortal();
  const completedCount = countCompletedTopics(course, completedTopics);
  const firstIncompleteTopic =
    course.topics.find((topic) => !isTopicCompleted(course.courseId, topic.topicId)) ?? course.topics[0];
  const bookmarkCount = course.topics.filter((topic) =>
    bookmarkedTopics.includes(buildTopicKey(course.courseId, topic.topicId)),
  ).length;

  return (
    <main className="grid gap-6">
      <section className="section-card overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${course.accent}`} aria-hidden="true" />
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
            <div className="max-w-3xl">
              <p className="eyebrow">{course.label}</p>
              <h1 className="headline mt-4 text-4xl font-bold">{course.courseTitle}</h1>
              <p className="mt-4 text-sm leading-8 text-[var(--text-soft)]">
                {course.courseDescription}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="surface-soft rounded-[24px] p-4">
                <p className="text-sm text-[var(--text-soft)]">Topics</p>
                <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                  {course.topics.length}
                </p>
              </div>
              <div className="surface-soft rounded-[24px] p-4">
                <p className="text-sm text-[var(--text-soft)]">Bookmarked</p>
                <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                  {bookmarkCount}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={`/tutorials/${course.courseId}/${firstIncompleteTopic.topicId}`} className="btn-primary">
              Continue course
              <ArrowRight size={16} />
            </Link>
            <div className="btn-secondary !cursor-default">
              <CheckCircle2 size={16} />
              {completedCount} completed
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="section-card">
          <p className="eyebrow">How to study this track</p>
          <div className="mt-5 grid gap-4">
            <div className="surface-soft rounded-[24px] p-4">
              Start with the course introduction, then move lesson by lesson using the sidebar.
            </div>
            <div className="surface-soft rounded-[24px] p-4">
              Run the code example, complete the practice task, and mark the topic done when it feels clear.
            </div>
            <div className="surface-soft rounded-[24px] p-4">
              Bookmark the lessons you want to revisit before building projects or attending interviews.
            </div>
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">What you will build</p>
          <div className="mt-5 grid gap-4">
            <div className="surface-soft rounded-[24px] p-4 text-sm leading-7 text-[var(--text-soft)]">
              Understand the core ideas behind <strong>{course.courseTitle}</strong> and connect them to
              practical MERN features.
            </div>
            <div className="surface-soft rounded-[24px] p-4 text-sm leading-7 text-[var(--text-soft)]">
              Practice explaining concepts clearly enough for team discussions, code reviews, and interviews.
            </div>
            <div className="surface-soft rounded-[24px] p-4 text-sm leading-7 text-[var(--text-soft)]">
              Use the examples here as a starting point for your own mini projects and revision notes.
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
              className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-[var(--border)] px-4 py-4 transition hover:border-emerald-500/30 hover:bg-emerald-500/5"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500/10 font-display text-sm font-bold text-emerald-700 dark:text-emerald-200">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-semibold text-[var(--text-main)]">{topic.topicTitle}</p>
                  <p className="text-sm text-[var(--text-soft)]">{topic.estimatedMinutes} minute lesson</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[var(--text-soft)]">
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

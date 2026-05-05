import { Bookmark, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock.jsx';
import TryItEditor from '../components/TryItEditor.jsx';
import { usePortal } from '../context/PortalContext.jsx';
import NotFound from './NotFound.jsx';
import { findTopic, getTopicNavigation } from '../utils/navigation.js';

function TutorialTopic() {
  const { course } = useOutletContext();
  const { topicId } = useParams();
  const { toggleCompleted, toggleBookmark, isTopicCompleted, isTopicBookmarked } = usePortal();
  const topic = findTopic(course, topicId);

  if (!topic) {
    return <NotFound />;
  }

  const { previousTopic, nextTopic, currentIndex } = getTopicNavigation(course, topic.topicId);
  const completed = isTopicCompleted(course.courseId, topic.topicId);
  const bookmarked = isTopicBookmarked(course.courseId, topic.topicId);

  return (
    <main className="grid gap-6">
      <section className="section-card">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-faint)]">
          <Link to="/" className="hover:text-emerald-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/tutorials" className="hover:text-emerald-600">
            Tutorials
          </Link>
          <ChevronRight size={14} />
          <Link to={`/tutorials/${course.courseId}`} className="hover:text-emerald-600">
            {course.courseTitle}
          </Link>
          <ChevronRight size={14} />
          <span>{topic.topicTitle}</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <span className="eyebrow">{course.label}</span>
              <span className="pill">Lesson {currentIndex + 1}</span>
              <span className="pill">{topic.estimatedMinutes} min</span>
            </div>
            <h1 className="headline mt-4 text-4xl font-bold">{topic.topicTitle}</h1>
            <p className="mt-4 text-base leading-8 text-[var(--text-main)]/90">{topic.simpleExplanation}</p>
            <p className="mt-4 text-sm leading-8 text-[var(--text-soft)]">{topic.explanation}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggleCompleted(course.courseId, topic.topicId)}
              className={completed ? 'btn-primary' : 'btn-secondary'}
            >
              <CheckCircle2 size={16} />
              {completed ? 'Completed' : 'Mark as completed'}
            </button>
            <button
              type="button"
              onClick={() => toggleBookmark(course.courseId, topic.topicId)}
              className={bookmarked ? 'btn-primary' : 'btn-secondary'}
            >
              <Bookmark size={16} />
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="section-card">
          <p className="eyebrow">In simple words</p>
          <p className="mt-5 text-sm leading-8 text-[var(--text-soft)]">{topic.simpleExplanation}</p>
        </article>

        <article className="section-card">
          <p className="eyebrow">Why it matters</p>
          <p className="mt-5 text-sm leading-8 text-[var(--text-soft)]">{topic.whyItMatters}</p>
        </article>

        <article className="section-card">
          <p className="eyebrow">{topic.realLifeExample.title}</p>
          <p className="mt-5 text-sm leading-8 text-[var(--text-soft)]">
            {topic.realLifeExample.scenario}
          </p>
          <div className="mt-4 rounded-[22px] border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm leading-7 text-[var(--text-soft)]">
            {topic.realLifeExample.takeaway}
          </div>
        </article>
      </section>

      <section className="section-card">
        <p className="eyebrow">Key points</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {topic.keyPoints.map((point) => (
            <article
              key={point}
              className="surface-soft rounded-[24px] p-4 text-sm leading-7 text-[var(--text-soft)]"
            >
              {point}
            </article>
          ))}
        </div>
      </section>

      <CodeBlock example={topic.codeExample} />
      <TryItEditor key={topic.topicId} example={topic.codeExample} />

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="section-card">
          <p className="eyebrow">Expected output</p>
          <p className="mt-5 text-sm leading-8 text-[var(--text-soft)]">{topic.output}</p>
        </article>

        <article className="section-card">
          <p className="eyebrow">Practice task</p>
          <p className="mt-5 text-sm leading-8 text-[var(--text-soft)]">{topic.practiceTask}</p>
        </article>

        <article className="section-card">
          <p className="eyebrow">Common mistakes</p>
          <div className="mt-5 grid gap-3">
            {topic.commonMistakes.map((mistake) => (
              <div
                key={mistake}
                className="surface-soft rounded-[24px] p-4 text-sm leading-7 text-[var(--text-soft)]"
              >
                {mistake}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {previousTopic ? (
          <Link
            to={`/tutorials/${course.courseId}/${previousTopic.topicId}`}
            className="section-card flex items-center justify-between transition hover:border-emerald-500/25 hover:bg-emerald-500/5"
          >
            <div className="flex items-center gap-3">
              <ChevronLeft size={18} className="text-[var(--text-faint)]" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-faint)]">Previous</p>
                <p className="font-semibold text-[var(--text-main)]">{previousTopic.topicTitle}</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="section-card border-dashed text-sm text-[var(--text-soft)]">
            This is the first lesson in the course.
          </div>
        )}

        {nextTopic ? (
          <Link
            to={`/tutorials/${course.courseId}/${nextTopic.topicId}`}
            className="section-card flex items-center justify-between transition hover:border-emerald-500/25 hover:bg-emerald-500/5"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-faint)]">Next</p>
              <p className="font-semibold text-[var(--text-main)]">{nextTopic.topicTitle}</p>
            </div>
            <ChevronRight size={18} className="text-[var(--text-faint)]" />
          </Link>
        ) : (
          <div className="section-card border-dashed text-sm text-[var(--text-soft)]">
            You reached the end of this course. Review bookmarks or start a project next.
          </div>
        )}
      </section>
    </main>
  );
}

export default TutorialTopic;

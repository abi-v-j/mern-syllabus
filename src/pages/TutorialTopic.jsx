import {
  Bookmark,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  Target,
} from 'lucide-react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock.jsx';
import TryItEditor from '../components/TryItEditor.jsx';
import { usePortal } from '../context/PortalContext.jsx';
import { getExampleTemplate } from '../data/examples.js';
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
  const example = getExampleTemplate(
    course.courseId,
    course.courseTitle,
    topic.topicTitle,
    currentIndex,
  );
  const lessonMeta = [
    { label: 'Lesson', value: `${currentIndex + 1} of ${course.topics.length}` },
    { label: 'Time', value: `${topic.estimatedMinutes} min` },
    { label: 'Level', value: course.level },
  ];
  const summaryItems = [
    ['Goal', topic.learningOutcome],
    ['Best tools', topic.tools.join(', ')],
    ['Ask next', topic.starterQuestion],
  ];
  const coachPlan = topic.coachPlan;

  return (
    <main className="mx-auto grid max-w-6xl gap-5">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-float md:p-7">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-faint)] md:text-sm">
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

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="eyebrow">{course.label}</span>
              <span className="pill">{course.stageBadge}</span>
            </div>
            <h1 className="headline mt-4 text-3xl font-bold leading-tight md:text-5xl">
              {topic.topicTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-main)]/90 md:text-lg">
              {topic.simpleExplanation}
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--text-soft)]">
              {topic.explanation}
            </p>
          </div>

          <div className="grid gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            {lessonMeta.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-faint)]">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-[var(--text-main)]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
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
          <Link
            to={`/assistant?q=${encodeURIComponent(topic.starterQuestion)}`}
            className="btn-secondary"
          >
            <MessageSquareText size={16} />
            Ask AI guide
          </Link>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-float md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Course lessons</p>
            <h2 className="headline mt-3 text-2xl font-bold">Pick the next lesson anytime</h2>
          </div>
          <Link to={`/tutorials/${course.courseId}`} className="btn-secondary">
            <BookOpen size={16} />
            Course intro
          </Link>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {course.topics.map((courseTopic, index) => {
            const isCurrent = courseTopic.topicId === topic.topicId;
            const topicDone = isTopicCompleted(course.courseId, courseTopic.topicId);
            const topicSaved = isTopicBookmarked(course.courseId, courseTopic.topicId);

            return (
              <Link
                key={courseTopic.topicId}
                to={`/tutorials/${course.courseId}/${courseTopic.topicId}`}
                className={`group rounded-lg border p-4 transition ${
                  isCurrent
                    ? 'border-emerald-500/45 bg-emerald-500/10'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:border-emerald-500/35 hover:bg-emerald-500/5'
                }`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-md text-sm font-bold ${
                      topicDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-200'
                          : 'bg-[var(--surface-strong)] text-[var(--text-faint)]'
                    }`}
                  >
                    {topicDone ? <CheckCircle2 size={16} /> : index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold leading-6 text-[var(--text-main)]">
                      {courseTopic.topicTitle}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="pill">{courseTopic.estimatedMinutes} min</span>
                      {isCurrent && (
                        <span className="rounded-md bg-[var(--brand-soft)] px-3 py-1 font-medium text-[var(--brand-strong)]">
                          Current
                        </span>
                      )}
                      {topicSaved && (
                        <span className="rounded-md bg-[var(--accent-soft)] px-3 py-1 font-medium text-[var(--accent)]">
                          Saved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5">
          <p className="eyebrow">In simple words</p>
          <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
            {topic.simpleExplanation}
          </p>
        </article>

        <article className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5">
          <p className="eyebrow">Why it matters</p>
          <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{topic.whyItMatters}</p>
        </article>

        <article className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5">
          <p className="eyebrow">{topic.realLifeExample.title}</p>
          <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
            {topic.realLifeExample.scenario}
          </p>
          <p className="mt-4 border-l-2 border-emerald-500/50 pl-4 text-sm leading-7 text-[var(--text-main)]">
            {topic.realLifeExample.takeaway}
          </p>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5 md:p-6">
          <p className="eyebrow">Key points</p>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {topic.keyPoints.map((point, index) => (
              <li
                key={point}
                className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-7 text-[var(--text-soft)]"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[var(--brand-soft)] text-xs font-bold text-[var(--brand-strong)]">
                  {index + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </article>

        <aside className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5 md:p-6">
          <p className="eyebrow">Quick lesson summary</p>
          <dl className="mt-5 grid gap-3">
            {summaryItems.map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <dt className="text-sm font-semibold text-[var(--text-main)]">{label}</dt>
                <dd className="mt-1 text-sm leading-7 text-[var(--text-soft)]">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="overflow-hidden rounded-lg border border-[var(--border)] bg-[linear-gradient(135deg,var(--surface-strong),var(--surface-soft))] p-5 shadow-float md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Zero-to-hero coaching path</p>
            <h2 className="headline mt-3 text-2xl font-bold">
              Learn it, build it, explain it like a pro
            </h2>
          </div>
          <Link
            to={`/assistant?q=${encodeURIComponent(`Coach me step by step on ${topic.topicTitle} for a MERN project.`)}`}
            className="btn-secondary"
          >
            <GraduationCap size={16} />
            Ask for coaching
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {coachPlan.path.map((step) => (
            <article
              key={step.label}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <span className="pill w-fit">{step.label}</span>
              <h3 className="mt-4 font-display text-lg font-bold text-[var(--text-main)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{step.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-500" />
              <p className="font-semibold text-[var(--text-main)]">Pro coaching note</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{coachPlan.proTip}</p>
          </article>

          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-center gap-2">
              <MessageSquareText size={18} className="text-emerald-500" />
              <p className="font-semibold text-[var(--text-main)]">Interview-ready answer</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
              {coachPlan.interviewAnswer}
            </p>
          </article>

          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-sky-500" />
              <p className="font-semibold text-[var(--text-main)]">Coach checkpoints</p>
            </div>
            <ul className="mt-3 grid gap-2">
              {coachPlan.checkpoints.map((checkpoint) => (
                <li
                  key={checkpoint}
                  className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] p-3 text-sm leading-6 text-[var(--text-soft)]"
                >
                  {checkpoint}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <CodeBlock example={example} />
      <TryItEditor key={topic.topicId} example={example} />

      <section className="grid gap-4 lg:grid-cols-[0.8fr_0.8fr_1fr]">
        <article className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5">
          <p className="eyebrow">Expected output</p>
          <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{example.output}</p>
        </article>

        <article className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5">
          <p className="eyebrow">Practice task</p>
          <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{topic.practiceTask}</p>
        </article>

        <article className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5">
          <p className="eyebrow">Common mistakes</p>
          <ul className="mt-4 grid gap-3">
            {topic.commonMistakes.map((mistake) => (
              <li
                key={mistake}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 text-sm leading-7 text-[var(--text-soft)]"
              >
                {mistake}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {previousTopic ? (
          <Link
            to={`/tutorials/${course.courseId}/${previousTopic.topicId}`}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5 transition hover:border-emerald-500/25 hover:bg-emerald-500/5"
          >
            <div className="flex items-center gap-3">
              <ChevronLeft size={18} className="text-[var(--text-faint)]" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-faint)]">
                  Previous
                </p>
                <p className="font-semibold text-[var(--text-main)]">{previousTopic.topicTitle}</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-strong)] p-5 text-sm text-[var(--text-soft)]">
            This is the first lesson in the course.
          </div>
        )}

        {nextTopic ? (
          <Link
            to={`/tutorials/${course.courseId}/${nextTopic.topicId}`}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5 transition hover:border-emerald-500/25 hover:bg-emerald-500/5"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-faint)]">Next</p>
                <p className="font-semibold text-[var(--text-main)]">{nextTopic.topicTitle}</p>
              </div>
              <ChevronRight size={18} className="text-[var(--text-faint)]" />
            </div>
          </Link>
        ) : (
          <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-strong)] p-5 text-sm text-[var(--text-soft)]">
            You reached the end of this course. Review bookmarks, ask the AI guide, or start a
            project next.
          </div>
        )}
      </section>
    </main>
  );
}

export default TutorialTopic;

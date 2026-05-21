import { ArrowRight, CheckSquare, Drill, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';

function Exercises() {
  const { courses } = usePortal();
  const exerciseCards = courses.flatMap((course) =>
    course.topics.slice(0, 2).map((topic) => ({
      courseId: course.courseId,
      courseTitle: course.courseTitle,
      topicId: topic.topicId,
      topicTitle: topic.topicTitle,
      practiceTask: topic.practiceTask,
      level: course.level,
      stageBadge: course.stageBadge,
    })),
  );

  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Exercises</p>
            <h1 className="headline mt-4 text-4xl font-bold">
              Topic-wise practice prompts for revision and retention
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--text-soft)]">
              Use these quick tasks after each lesson so you are not only reading. The goal is to
              rewrite, explain, compare, and apply the topic in your own words.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="surface-soft p-5">
              <Drill size={18} className="text-emerald-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Practice cards</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                {exerciseCards.length}
              </p>
            </div>
            <div className="surface-soft p-5">
              <Target size={18} className="text-sky-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Designed for</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                Clarity
              </p>
            </div>
            <div className="surface-soft p-5">
              <CheckSquare size={18} className="text-amber-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Best for</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                Revision
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        {exerciseCards.map((exercise) => (
          <article key={`${exercise.courseId}-${exercise.topicId}`} className="section-card">
            <div className="flex flex-wrap gap-2">
              <span className="eyebrow">{exercise.courseTitle}</span>
              <span className="pill">{exercise.stageBadge}</span>
              <span className="pill">{exercise.level}</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-[var(--text-main)]">
              {exercise.topicTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
              {exercise.practiceTask}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/tutorials/${exercise.courseId}/${exercise.topicId}`}
                className="btn-primary"
              >
                Open topic
                <ArrowRight size={16} />
              </Link>
              <Link
                to={`/assistant?q=${encodeURIComponent(`Help me understand ${exercise.topicTitle}`)}`}
                className="btn-secondary"
              >
                Ask AI guide
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Exercises;

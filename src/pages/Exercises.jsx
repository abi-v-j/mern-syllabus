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
    })),
  );

  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Exercises</p>
            <h1 className="headline mt-4 text-4xl font-bold">Topic-wise practice prompts for revision</h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--text-soft)]">
              Use these quick practice tasks to test understanding before moving to the next lesson
              or before you begin a larger project.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="surface-soft rounded-[28px] p-5">
              <Drill size={18} className="text-emerald-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Practice cards</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                {exerciseCards.length}
              </p>
            </div>
            <div className="surface-soft rounded-[28px] p-5">
              <Target size={18} className="text-sky-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Focused</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">Short</p>
            </div>
            <div className="surface-soft rounded-[28px] p-5">
              <CheckSquare size={18} className="text-amber-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Best for</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">Revision</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        {exerciseCards.map((exercise) => (
          <article key={`${exercise.courseId}-${exercise.topicId}`} className="section-card">
            <p className="eyebrow">{exercise.courseTitle}</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-[var(--text-main)]">
              {exercise.topicTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{exercise.practiceTask}</p>
            <Link to={`/tutorials/${exercise.courseId}/${exercise.topicId}`} className="btn-primary mt-6">
              Open topic
              <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Exercises;

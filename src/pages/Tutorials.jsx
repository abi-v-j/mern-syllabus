import { BookCopy, Layers3, Search, Sparkles } from 'lucide-react';
import TopicCard from '../components/TopicCard.jsx';
import { usePortal } from '../context/PortalContext.jsx';
import { learningStages } from '../data/courses.js';

function Tutorials() {
  const { courses } = usePortal();
  const totalTopics = courses.reduce((count, course) => count + course.topics.length, 0);
  const stageGroups = learningStages.map((stage) => ({
    ...stage,
    courses: courses.filter((course) => course.stageId === stage.stageId),
  }));

  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Tutorial library</p>
            <h1 className="headline mt-4 text-4xl font-bold">
              Browse the complete zero-to-hero MERN roadmap
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--text-soft)]">
              The syllabus is grouped into clear phases so learners can move from fundamentals to
              production-ready features without getting lost in random topics.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="surface-soft p-5">
              <BookCopy size={18} className="text-emerald-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Courses</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                {courses.length}
              </p>
            </div>
            <div className="surface-soft p-5">
              <Sparkles size={18} className="text-amber-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Topics</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                {totalTopics}
              </p>
            </div>
            <div className="surface-soft p-5">
              <Search size={18} className="text-sky-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Discovery</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">Smart</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6">
        {stageGroups.map((stage) => (
          <div key={stage.stageId} className="grid gap-5">
            <article className="section-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">{stage.badge}</p>
                  <h2 className="headline mt-4 text-3xl font-bold">{stage.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-soft)]">
                    {stage.summary}
                  </p>
                </div>
                <div className="surface-soft px-4 py-3 text-sm text-[var(--text-soft)]">
                  <span className="inline-flex items-center gap-2">
                    <Layers3 size={16} className="text-emerald-500" />
                    {stage.courses.length} courses in this phase
                  </span>
                </div>
              </div>
            </article>

            <div className="grid gap-6 xl:grid-cols-2">
              {stage.courses.map((course) => (
                <TopicCard key={course.courseId} course={course} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Tutorials;

import { BookCopy, Search, Sparkles } from 'lucide-react';
import TopicCard from '../components/TopicCard.jsx';
import { usePortal } from '../context/PortalContext.jsx';

function Tutorials() {
  const { courses } = usePortal();
  const totalTopics = courses.reduce((count, course) => count + course.topics.length, 0);

  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Tutorial library</p>
            <h1 className="headline mt-4 text-4xl font-bold">Browse the complete MERN syllabus</h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--text-soft)]">
              Open any course, follow the topic sidebar, and move from beginner concepts to
              advanced full-stack architecture at your own pace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="surface-soft rounded-[28px] p-5">
              <BookCopy size={18} className="text-emerald-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Courses</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                {courses.length}
              </p>
            </div>
            <div className="surface-soft rounded-[28px] p-5">
              <Sparkles size={18} className="text-amber-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Topics</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                {totalTopics}
              </p>
            </div>
            <div className="surface-soft rounded-[28px] p-5">
              <Search size={18} className="text-sky-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Searchable</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">Global</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        {courses.map((course) => (
          <TopicCard key={course.courseId} course={course} />
        ))}
      </section>
    </main>
  );
}

export default Tutorials;

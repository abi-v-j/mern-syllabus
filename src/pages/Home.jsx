import { ArrowRight, Bookmark, CheckCircle2, Code2, Layers3, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopicCard from '../components/TopicCard.jsx';
import { usePortal } from '../context/PortalContext.jsx';

const featureCards = [
  {
    title: 'Search the whole syllabus',
    description: 'Jump straight to a course or topic from the sticky global search bar.',
    icon: Search,
  },
  {
    title: 'Practice with live code',
    description: 'Edit HTML, CSS, and JavaScript examples and see the output instantly.',
    icon: Code2,
  },
  {
    title: 'Track your learning',
    description: 'Save bookmarks and mark topics complete using local progress tracking.',
    icon: CheckCircle2,
  },
  {
    title: 'Move from basics to projects',
    description: 'Study the concepts, then connect them to portfolio-ready MERN builds.',
    icon: Layers3,
  },
];

function Home() {
  const { courses, completedCount, bookmarkedTopicEntries } = usePortal();
  const totalTopics = courses.reduce((count, course) => count + course.topics.length, 0);

  return (
    <main className="shell py-8 md:py-10">
      <section className="relative overflow-hidden rounded-[40px] border border-[var(--border)] bg-[var(--surface-strong)] p-6 shadow-float md:p-10">
        <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden="true" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="eyebrow">
              <Sparkles size={14} />
              W3Schools-inspired MERN portal
            </span>
            <h1 className="headline mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              A complete zero-to-hero MERN learning website built with React and Tailwind.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-soft)]">
              Study every topic from web basics to deployment in one clean portal. Use the sidebar
              lesson flow, search any concept instantly, practice code in the browser, and keep
              your progress saved locally.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/tutorials" className="btn-primary">
                Start learning
                <ArrowRight size={16} />
              </Link>
              <Link to={`/tutorials/${courses[0].courseId}`} className="btn-secondary">
                Open first course
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="surface-soft rounded-[28px] p-5">
                <p className="text-sm text-[var(--text-soft)]">Courses</p>
                <p className="mt-2 font-display text-4xl font-bold text-[var(--text-main)]">
                  {courses.length}
                </p>
              </div>
              <div className="surface-soft rounded-[28px] p-5">
                <p className="text-sm text-[var(--text-soft)]">Topics</p>
                <p className="mt-2 font-display text-4xl font-bold text-[var(--text-main)]">
                  {totalTopics}
                </p>
              </div>
              <div className="surface-soft rounded-[28px] p-5">
                <p className="text-sm text-[var(--text-soft)]">Saved lessons</p>
                <p className="mt-2 font-display text-4xl font-bold text-[var(--text-main)]">
                  {bookmarkedTopicEntries.length}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="section-card">
              <p className="eyebrow">Current momentum</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-slate-950 p-5 text-white">
                  <p className="text-sm text-slate-300">Completed topics</p>
                  <p className="mt-3 font-display text-4xl font-bold">{completedCount}</p>
                </div>
                <div className="rounded-[24px] bg-emerald-500/10 p-5">
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">Bookmarked topics</p>
                  <p className="mt-3 font-display text-4xl font-bold text-[var(--text-main)]">
                    {bookmarkedTopicEntries.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="section-card">
                <Bookmark size={18} className="text-amber-500" />
                <h3 className="mt-4 font-display text-2xl font-bold text-[var(--text-main)]">
                  Save key lessons
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                  Bookmark topics to build your own revision list before interviews or projects.
                </p>
              </div>
              <div className="section-card">
                <Code2 size={18} className="text-sky-500" />
                <h3 className="mt-4 font-display text-2xl font-bold text-[var(--text-main)]">
                  Practice as you learn
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                  Every topic includes explanation, code examples, practice tasks, and common mistakes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Portal features</p>
            <h2 className="headline mt-4 text-3xl font-bold">Everything needed for guided self-study</h2>
          </div>
          <Link to="/exercises" className="btn-secondary">
            Explore exercises
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="section-card">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-[var(--text-main)]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured courses</p>
            <h2 className="headline mt-4 text-3xl font-bold">Move through the syllabus in connected tracks</h2>
          </div>
          <Link to="/tutorials" className="btn-primary">
            View all courses
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          {courses.slice(0, 6).map((course) => (
            <TopicCard key={course.courseId} course={course} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;

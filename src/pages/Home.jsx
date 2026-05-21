import { ArrowRight, BrainCircuit, Code2, Layers3, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopicCard from '../components/TopicCard.jsx';
import { usePortal } from '../context/PortalContext.jsx';
import { learningStages } from '../data/courses.js';

const featureCards = [
  {
    title: 'Zero-to-hero roadmap',
    description:
      'Follow the syllabus in phases so beginners know what to learn first and what to skip until later.',
    icon: Layers3,
  },
  {
    title: 'Smarter search',
    description:
      'Search by concept, package, library, or project goal and jump to the closest lesson fast.',
    icon: Search,
  },
  {
    title: 'Copyable code',
    description:
      'Every lesson includes clean example code you can copy, edit, and practice immediately.',
    icon: Code2,
  },
  {
    title: 'RAG study guide',
    description:
      'Ask questions in plain English and get linked answers built from the syllabus knowledge base.',
    icon: BrainCircuit,
  },
];

const spotlightTopics = [
  'Framer Motion',
  'GSAP',
  'Material UI (MUI)',
  'Tailwind CSS',
  'Redux Toolkit',
  'Recoil',
  'Zustand',
  'Jotai',
  'Helmet',
  'cors',
  'morgan',
  'jsonwebtoken',
  'bcrypt',
  'Passport.js',
  'Joi',
  'Zod',
  'Multer',
  'Socket.IO',
  'Axios',
  'Swagger UI Express',
  'Redis',
  'BullMQ',
  'dotenv',
  'Nodemailer',
];

function Home() {
  const { courses, completedCount, bookmarkedTopicEntries } = usePortal();
  const totalTopics = courses.reduce((count, course) => count + course.topics.length, 0);
  const stageCards = learningStages.map((stage) => ({
    ...stage,
    courses: courses.filter((course) => course.stageId === stage.stageId),
  }));

  return (
    <main className="shell py-6 md:py-10">
      <section className="relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-6 shadow-float md:p-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand)] via-[var(--accent)] to-[var(--info)]" />

        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <span className="eyebrow">
              <Sparkles size={14} />
              MERN zero-to-hero learning system
            </span>
            <h1 className="headline mt-6 max-w-4xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              A premium MERN learning console from basics to production.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text-soft)]">
              Follow a clean roadmap, jump to exact lessons, practice copyable code, and ask the RAG
              guide when a topic needs a simpler explanation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/tutorials" className="btn-primary">
                Start the roadmap
                <ArrowRight size={16} />
              </Link>
              <Link to="/assistant" className="btn-secondary">
                Ask the AI guide
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="surface-soft p-5">
                <p className="text-sm text-[var(--text-soft)]">Courses</p>
                <p className="mt-2 text-4xl font-extrabold text-[var(--text-main)]">
                  {courses.length}
                </p>
              </div>
              <div className="surface-soft p-5">
                <p className="text-sm text-[var(--text-soft)]">Topics</p>
                <p className="mt-2 text-4xl font-extrabold text-[var(--text-main)]">
                  {totalTopics}
                </p>
              </div>
              <div className="surface-soft p-5">
                <p className="text-sm text-[var(--text-soft)]">Saved lessons</p>
                <p className="mt-2 text-4xl font-extrabold text-[var(--text-main)]">
                  {bookmarkedTopicEntries.length}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="section-card">
              <p className="eyebrow">Current momentum</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-[var(--code-bg)] p-5 text-white">
                  <p className="text-sm text-slate-300">Completed topics</p>
                  <p className="mt-3 text-4xl font-extrabold">{completedCount}</p>
                </div>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--accent-soft)] p-5">
                  <p className="text-sm text-[var(--text-soft)]">Bookmarked topics</p>
                  <p className="mt-3 text-4xl font-extrabold text-[var(--text-main)]">
                    {bookmarkedTopicEntries.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="section-card">
              <p className="eyebrow">What is included</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {spotlightTopics.map((topic) => (
                  <span key={topic} className="pill">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Portal features</p>
            <h2 className="headline mt-4 text-3xl font-bold">
              Built to be simple, practical, and interesting
            </h2>
          </div>
          <Link to="/search" className="btn-secondary">
            Open smart search
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="section-card">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--brand-soft)] text-[var(--brand-strong)]">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[var(--text-main)]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Roadmap phases</p>
            <h2 className="headline mt-4 text-3xl font-bold">
              A cleaner learning sequence from fundamentals to scale
            </h2>
          </div>
          <Link to="/tutorials" className="btn-primary">
            View full syllabus
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {stageCards.map((stage) => (
            <article key={stage.stageId} className="section-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow">{stage.badge}</span>
                <span className="pill">{stage.courses.length} courses</span>
              </div>
              <h3 className="headline mt-4 text-3xl font-bold">{stage.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{stage.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {stage.courses.slice(0, 4).map((course) => (
                  <span key={course.courseId} className="pill">
                    {course.courseTitle}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured courses</p>
            <h2 className="headline mt-4 text-3xl font-bold">
              Strong starting points for the new roadmap
            </h2>
          </div>
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

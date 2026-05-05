import { ArrowRight, Layers3, Rocket, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectCards } from '../data/resources.js';

function levelClass(level) {
  if (level === 'Beginner') {
    return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
  }

  if (level === 'Intermediate') {
    return 'bg-amber-500/10 text-amber-700 dark:text-amber-300';
  }

  return 'bg-sky-500/10 text-sky-700 dark:text-sky-300';
}

function Projects() {
  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Projects</p>
            <h1 className="headline mt-4 text-4xl font-bold">Project ideas that turn topics into portfolio work</h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--text-soft)]">
              Start small, connect concepts across the stack, then grow into more advanced builds
              with auth, realtime features, payments, and maintainable architecture.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="surface-soft rounded-[28px] p-5">
              <Rocket size={18} className="text-emerald-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Begin with</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">CRUD</p>
            </div>
            <div className="surface-soft rounded-[28px] p-5">
              <Layers3 size={18} className="text-sky-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Then add</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">Auth</p>
            </div>
            <div className="surface-soft rounded-[28px] p-5">
              <Wrench size={18} className="text-amber-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Finish with</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">Scale</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        {projectCards.map((project) => (
          <article key={project.title} className="section-card">
            <div className="flex items-center justify-between gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${levelClass(project.level)}`}>
                {project.level}
              </span>
              <Link to="/tutorials" className="btn-ghost">
                Match topics
                <ArrowRight size={16} />
              </Link>
            </div>

            <h2 className="mt-5 font-display text-3xl font-bold text-[var(--text-main)]">
              {project.title}
            </h2>
            <p className="mt-4 text-sm leading-8 text-[var(--text-soft)]">{project.summary}</p>

            <div className="mt-5 grid gap-3">
              {project.outcomes.map((outcome) => (
                <div key={outcome} className="surface-soft rounded-[24px] p-4 text-sm text-[var(--text-soft)]">
                  {outcome}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Projects;

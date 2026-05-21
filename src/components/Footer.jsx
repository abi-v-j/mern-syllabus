import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)]">
      <div className="shell py-10">
        <div className="grid gap-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-float md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div>
            <p className="eyebrow">Keep building</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text-main)]">
              Learn the MERN stack with one connected, searchable study flow.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-soft)]">
              Explore the roadmap, search exact tools, ask the RAG guide, practice with copyable
              code, and turn the syllabus into real projects you can explain with confidence.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/tutorials" className="btn-primary">
              Start tutorials
            </Link>
            <Link to="/assistant" className="btn-secondary">
              Ask AI guide
            </Link>
            <Link to="/projects" className="btn-secondary">
              View projects
            </Link>
            <Link to="/search" className="btn-secondary">
              Search lessons
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

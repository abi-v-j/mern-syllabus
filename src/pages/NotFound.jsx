import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="shell py-16">
      <section className="mx-auto max-w-3xl rounded-[40px] border border-[var(--border)] bg-[var(--surface-strong)] p-8 text-center shadow-float md:p-12">
        <p className="eyebrow">404</p>
        <h1 className="headline mt-5 text-4xl font-bold">This lesson path does not exist</h1>
        <p className="mt-4 text-sm leading-8 text-[var(--text-soft)]">
          The page may have moved, or the course/topic link may not be valid. Use the tutorials page
          to jump back into the learning flow.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/tutorials" className="btn-primary">
            Back to tutorials
          </Link>
          <Link to="/" className="btn-secondary">
            <ArrowLeft size={16} />
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;

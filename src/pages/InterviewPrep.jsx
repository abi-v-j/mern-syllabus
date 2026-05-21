import { BrainCircuit, MessageSquareText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { interviewGroups } from '../data/resources.js';

function InterviewPrep() {
  const totalQuestions = interviewGroups.reduce(
    (questionCount, group) => questionCount + group.questions.length,
    0,
  );

  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Interview prep</p>
            <h1 className="headline mt-4 text-4xl font-bold">
              Grouped questions for clearer, stronger MERN answers
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--text-soft)]">
              Review these clusters after finishing each phase. The goal is not only to know the
              answer, but to explain the reasoning, tradeoffs, and project examples clearly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="surface-soft p-5">
              <MessageSquareText size={18} className="text-emerald-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Questions</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                {totalQuestions}
              </p>
            </div>
            <div className="surface-soft p-5">
              <BrainCircuit size={18} className="text-sky-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Focus</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                Practical
              </p>
            </div>
            <div className="surface-soft p-5">
              <Sparkles size={18} className="text-amber-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Groups</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">
                {interviewGroups.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/assistant?q=Ask me MERN interview questions about React and backend security."
          className="btn-primary"
        >
          Practice with AI guide
        </Link>
        <Link to="/projects" className="btn-secondary">
          Review project ideas
        </Link>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        {interviewGroups.map((group) => (
          <article key={group.title} className="section-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">{group.title}</p>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-xs font-semibold text-[var(--text-soft)]">
                {group.questions.length} questions
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text-main)]">
              {group.summary}
            </h2>
            <div className="mt-5 grid gap-3">
              {group.questions.map((question) => (
                <div
                  key={question}
                  className="surface-soft p-4 text-sm leading-7 text-[var(--text-soft)]"
                >
                  {question}
                </div>
              ))}
            </div>
            <Link
              to={`/assistant?q=${encodeURIComponent(`Ask me interview questions about ${group.title} and check my answer.`)}`}
              className="btn-secondary mt-5 w-full justify-center"
            >
              Practice {group.title}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default InterviewPrep;

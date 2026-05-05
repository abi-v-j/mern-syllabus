import { BrainCircuit, MessageSquareText, Sparkles } from 'lucide-react';
import { interviewGroups } from '../data/resources.js';

function InterviewPrep() {
  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Interview prep</p>
            <h1 className="headline mt-4 text-4xl font-bold">Grouped questions for confident explanations</h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--text-soft)]">
              Review these question clusters after finishing each course. The goal is not only to
              know the answer, but to explain the reasoning, tradeoffs, and project examples clearly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="surface-soft rounded-[28px] p-5">
              <MessageSquareText size={18} className="text-emerald-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Style</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">Clear</p>
            </div>
            <div className="surface-soft rounded-[28px] p-5">
              <BrainCircuit size={18} className="text-sky-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Focus</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">Practical</p>
            </div>
            <div className="surface-soft rounded-[28px] p-5">
              <Sparkles size={18} className="text-amber-500" />
              <p className="mt-3 text-sm text-[var(--text-soft)]">Goal</p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--text-main)]">Confidence</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        {interviewGroups.map((group) => (
          <article key={group.title} className="section-card">
            <p className="eyebrow">{group.title}</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text-main)]">
              {group.summary}
            </h2>
            <div className="mt-5 grid gap-3">
              {group.questions.map((question) => (
                <div key={question} className="surface-soft rounded-[24px] p-4 text-sm leading-7 text-[var(--text-soft)]">
                  {question}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default InterviewPrep;

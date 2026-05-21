import {
  ArrowRight,
  BookOpen,
  Link2,
  MessageSquareText,
  SendHorizontal,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';
import { assistantPrompts, buildAssistantReply } from '../utils/ragAssistant.js';

function AssistantReplyCard({ reply, onAsk }) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] shadow-float">
      <div className="grid gap-6 p-5 md:p-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} />
            Retrieved answer
          </span>
          <h3 className="headline mt-4 text-3xl font-bold">{reply.title}</h3>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--text-soft)]">
            {reply.answer}
          </p>

          {reply.bullets?.length > 0 && (
            <ol className="mt-6 grid gap-3">
              {reply.bullets.map((bullet, index) => (
                <li
                  key={bullet}
                  className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-7 text-[var(--text-soft)]"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[var(--brand-soft)] text-xs font-bold text-[var(--brand-strong)]">
                    {index + 1}
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <aside className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">Best lesson links</p>
            <BookOpen size={18} className="text-[var(--brand)]" />
          </div>

          {reply.links?.length > 0 ? (
            <div className="mt-4 grid gap-3">
              {reply.links.map((item) => (
                <Link
                  key={`${item.path}-${item.title}`}
                  to={item.path}
                  className="group rounded-md border border-[var(--border)] bg-[var(--surface-strong)] p-3 transition hover:border-[var(--brand)] hover:bg-[var(--brand-soft)]"
                >
                  <div className="flex items-start gap-3">
                    <Link2 size={16} className="mt-1 shrink-0 text-[var(--brand)]" />
                    <div className="min-w-0">
                      <p className="font-semibold leading-6 text-[var(--text-main)]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[var(--text-soft)]">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-strong)]">
                    Open lesson
                    <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
              Ask a more specific topic or package name to retrieve lesson links.
            </p>
          )}
        </aside>
      </div>

      {reply.followUps?.length > 0 && (
        <div className="border-t border-[var(--border)] px-5 py-4 md:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-faint)]">
              Ask next
            </span>
            {reply.followUps.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => onAsk(question)}
                className="pill transition hover:border-[var(--brand)] hover:bg-[var(--brand-soft)]"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function AiGuideContent({ initialQuery }) {
  const { courses } = usePortal();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() =>
    initialQuery
      ? [
          {
            id: 'boot-user',
            role: 'user',
            text: initialQuery,
          },
          {
            id: 'boot-assistant',
            role: 'assistant',
            reply: buildAssistantReply(courses, initialQuery),
          },
        ]
      : [],
  );

  const askQuestion = (question) => {
    const trimmed = question.trim();

    if (!trimmed) {
      return;
    }

    const reply = buildAssistantReply(courses, trimmed);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `${Date.now()}-user`,
        role: 'user',
        text: trimmed,
      },
      {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        reply,
      },
    ]);
    setInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askQuestion(input);
  };

  return (
    <main className="shell py-6 md:py-10">
      <section className="mx-auto max-w-6xl rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-float md:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow">AI study guide</p>
            <h1 className="headline mt-4 text-4xl font-bold">Ask, learn, and open the lesson</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-soft)]">
              Get a short syllabus-backed answer with direct lesson shortcuts beside it.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-center">
            <div>
              <p className="text-lg font-extrabold text-[var(--text-main)]">{courses.length}</p>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--text-faint)]">
                Courses
              </p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-[var(--text-main)]">
                {courses.reduce((count, course) => count + course.topics.length, 0)}
              </p>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--text-faint)]">
                Topics
              </p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-[var(--text-main)]">
                {messages.length / 2}
              </p>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--text-faint)]">
                Answers
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <label className="relative block">
            <span className="sr-only">Ask the MERN AI guide a question</span>
            <MessageSquareText
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
            />
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about JWT, React state, Redis, Tailwind, Socket.IO..."
              className="h-12 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] pl-11 pr-4 text-base font-medium text-[var(--text-main)] placeholder:text-[var(--text-faint)]"
            />
          </label>
          <button type="submit" className="btn-primary">
            <SendHorizontal size={16} />
            Ask assistant
          </button>
        </form>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-faint)]">
            Try a quick question
          </p>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {assistantPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => askQuestion(prompt)}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-xs font-semibold leading-5 text-[var(--text-soft)] transition hover:border-[var(--brand)] hover:bg-[var(--brand-soft)] hover:text-[var(--text-main)]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-6xl gap-4">
        {messages.length === 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {assistantPrompts.slice(0, 4).map((prompt, index) => (
              <button
                key={prompt}
                type="button"
                onClick={() => askQuestion(prompt)}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-4 text-left shadow-float transition hover:border-[var(--brand)] hover:bg-[var(--brand-soft)]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--brand-soft)] text-sm font-bold text-[var(--brand-strong)]">
                  {index + 1}
                </span>
                <span className="mt-4 block text-sm font-semibold leading-6 text-[var(--text-main)]">
                  {prompt}
                </span>
              </button>
            ))}
          </div>
        ) : (
          messages.map((message) =>
            message.role === 'user' ? (
              <div key={message.id} className="flex justify-end">
                <div className="w-fit max-w-2xl rounded-lg bg-[var(--code-bg)] px-5 py-4 text-white shadow-float">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-300">
                    You asked
                  </p>
                  <p className="mt-2 text-sm font-medium leading-7">{message.text}</p>
                </div>
              </div>
            ) : (
              <AssistantReplyCard key={message.id} reply={message.reply} onAsk={askQuestion} />
            ),
          )
        )}
      </section>
    </main>
  );
}

function AiGuide() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  return <AiGuideContent key={initialQuery} initialQuery={initialQuery} />;
}

export default AiGuide;

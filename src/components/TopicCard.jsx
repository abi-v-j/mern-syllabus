import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';
import { countCompletedTopics } from '../utils/navigation.js';

function TopicCard({ course }) {
  const { completedTopics } = usePortal();
  const completedCount = countCompletedTopics(course, completedTopics);

  return (
    <article className="section-card relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${course.accent}`} aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">{course.label}</span>
          <span className="rounded-2xl border border-white/50 bg-white/70 px-3 py-2 font-display text-xs font-bold tracking-[0.2em] text-slate-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100">
            {course.icon}
          </span>
        </div>

        <h3 className="mt-5 font-display text-2xl font-bold text-[var(--text-main)]">
          {course.courseTitle}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{course.courseDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="pill inline-flex items-center gap-2">
            <BookOpen size={14} />
            {course.topics.length} topics
          </span>
          <span className="pill inline-flex items-center gap-2">
            <CheckCircle2 size={14} />
            {completedCount} done
          </span>
        </div>

        <div className="mt-6 space-y-2">
          {course.topics.slice(0, 3).map((topic) => (
            <div
              key={topic.topicId}
              className="rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--text-soft)] dark:bg-slate-950/40"
            >
              {topic.topicTitle}
            </div>
          ))}
        </div>

        <Link to={`/tutorials/${course.courseId}`} className="btn-primary mt-6">
          Open course
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default TopicCard;

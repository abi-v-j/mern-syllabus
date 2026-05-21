import { ArrowRight, BookOpen, CheckCircle2, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';
import { countCompletedTopics } from '../utils/navigation.js';

function TopicCard({ course }) {
  const { completedTopics } = usePortal();
  const completedCount = countCompletedTopics(course, completedTopics);

  return (
    <article className="section-card group overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="eyebrow">{course.label}</span>
          <span className="rounded-md border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-2 text-xs font-extrabold tracking-[0.16em] text-[var(--brand-strong)]">
            {course.icon}
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[var(--text-main)]">
          {course.courseTitle}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{course.courseDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2 border-y border-[var(--border)] py-4">
          <span className="pill inline-flex items-center gap-2">
            <BookOpen size={14} />
            {course.topics.length} topics
          </span>
          <span className="pill inline-flex items-center gap-2">
            <Clock3 size={14} />~{course.estimatedHours} hr path
          </span>
          <span className="pill inline-flex items-center gap-2">
            <CheckCircle2 size={14} />
            {completedCount} done
          </span>
        </div>

        <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--surface-alt)] p-4 text-sm leading-7 text-[var(--text-soft)]">
          <strong className="text-[var(--text-main)]">Build focus:</strong> {course.buildProject}
        </div>

        <Link to={`/tutorials/${course.courseId}`} className="btn-primary mt-6 w-fit">
          Open course
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default TopicCard;

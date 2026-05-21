import { Bookmark, CheckCircle2, Clock3, Layers3 } from 'lucide-react';
import { usePortal } from '../context/PortalContext.jsx';
import { buildTopicKey, countCompletedTopics } from '../utils/navigation.js';

function ProgressTracker({ course, topic, topicIndex = 0 }) {
  const { completedTopics, bookmarkedTopics } = usePortal();
  const completedCount = course ? countCompletedTopics(course, completedTopics) : 0;
  const progress = course ? Math.round((completedCount / course.topics.length) * 100) : 0;
  const bookmarkCountForCourse = course
    ? course.topics.filter((entry) =>
        bookmarkedTopics.includes(buildTopicKey(course.courseId, entry.topicId)),
      ).length
    : 0;

  return (
    <div className="section-card sticky top-[calc(var(--portal-header-height)+1rem)]">
      <p className="eyebrow">Learning progress</p>
      <h3 className="mt-4 font-display text-2xl font-bold text-[var(--text-main)]">
        {course?.courseTitle ?? 'Progress overview'}
      </h3>
      {course && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="pill">{course.stageBadge}</span>
          <span className="pill">{course.level}</span>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div className="surface-soft p-4">
          <div className="flex items-center justify-between text-sm font-medium text-[var(--text-soft)]">
            <span>Completion</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="surface-soft flex items-center gap-3 p-4">
            <CheckCircle2 size={18} className="text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-main)]">
                {completedCount} completed
              </p>
              <p className="text-xs text-[var(--text-soft)]">
                Out of {course?.topics.length ?? 0} total topics
              </p>
            </div>
          </div>

          <div className="surface-soft flex items-center gap-3 p-4">
            <Bookmark size={18} className="text-amber-500" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-main)]">
                {bookmarkCountForCourse} saved
              </p>
              <p className="text-xs text-[var(--text-soft)]">Bookmarked topics in this course</p>
            </div>
          </div>

          <div className="surface-soft flex items-center gap-3 p-4">
            <Layers3 size={18} className="text-sky-500" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-main)]">
                Lesson {Math.max(topicIndex + 1, 1)}
              </p>
              <p className="text-xs text-[var(--text-soft)]">
                {topic ? topic.topicTitle : 'Course overview'}
              </p>
            </div>
          </div>

          {topic && (
            <div className="surface-soft flex items-center gap-3 p-4">
              <Clock3 size={18} className="text-rose-500" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">
                  {topic.estimatedMinutes} minute lesson
                </p>
                <p className="text-xs text-[var(--text-soft)]">Short, focused study target</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;

import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { usePortal } from '../context/PortalContext.jsx';
import NotFound from '../pages/NotFound.jsx';
import { findCourse, findTopic, getTopicNavigation } from '../utils/navigation.js';

function TutorialLayout() {
  const { courseId, topicId } = useParams();
  const { courses } = usePortal();
  const { isSidebarOpen, closeSidebar } = useOutletContext();
  const course = findCourse(courses, courseId);

  if (!course) {
    return <NotFound />;
  }

  const currentTopic = topicId ? findTopic(course, topicId) : null;
  const { currentIndex } = currentTopic
    ? getTopicNavigation(course, currentTopic.topicId)
    : { currentIndex: -1 };

  return (
    <section className="shell py-6 lg:py-8">
      <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)] xl:grid-cols-[290px_minmax(0,1fr)_320px]">
        <Sidebar
          key={course.courseId}
          course={course}
          currentTopicId={currentTopic?.topicId}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <div className="min-w-0">
          <Outlet context={{ course }} />
          <div className="mt-6 xl:hidden">
            <ProgressTracker
              course={course}
              topic={currentTopic}
              topicIndex={currentIndex < 0 ? 0 : currentIndex}
            />
          </div>
        </div>

        <div className="hidden xl:block">
          <ProgressTracker
            course={course}
            topic={currentTopic}
            topicIndex={currentIndex < 0 ? 0 : currentIndex}
          />
        </div>
      </div>
    </section>
  );
}

export default TutorialLayout;

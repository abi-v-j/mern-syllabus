import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import { usePortal } from '../context/PortalContext.jsx';
import NotFound from '../pages/NotFound.jsx';
import { findCourse, findTopic } from '../utils/navigation.js';

function TutorialLayout() {
  const { courseId, topicId } = useParams();
  const { courses } = usePortal();
  const { isSidebarOpen, closeSidebar } = useOutletContext();
  const course = findCourse(courses, courseId);

  if (!course) {
    return <NotFound />;
  }

  const currentTopic = topicId ? findTopic(course, topicId) : null;

  return (
    <section className="shell py-4 lg:py-6">
      <div className="lg:hidden">
        <Sidebar
          key={course.courseId}
          course={course}
          currentTopicId={currentTopic?.topicId}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
      </div>

      <Outlet context={{ course }} />
    </section>
  );
}

export default TutorialLayout;

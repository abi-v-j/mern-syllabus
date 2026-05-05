import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import TutorialLayout from '../layouts/TutorialLayout.jsx';
import About from '../pages/About.jsx';
import CourseOverview from '../pages/CourseOverview.jsx';
import Exercises from '../pages/Exercises.jsx';
import Home from '../pages/Home.jsx';
import InterviewPrep from '../pages/InterviewPrep.jsx';
import NotFound from '../pages/NotFound.jsx';
import Projects from '../pages/Projects.jsx';
import TutorialTopic from '../pages/TutorialTopic.jsx';
import Tutorials from '../pages/Tutorials.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="tutorials" element={<Tutorials />} />
        <Route path="tutorials/:courseId" element={<TutorialLayout />}>
          <Route index element={<CourseOverview />} />
          <Route path=":topicId" element={<TutorialTopic />} />
        </Route>
        <Route path="exercises" element={<Exercises />} />
        <Route path="projects" element={<Projects />} />
        <Route path="interview-prep" element={<InterviewPrep />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

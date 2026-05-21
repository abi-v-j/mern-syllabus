import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const PublicLayout = lazy(() => import('../layouts/PublicLayout.jsx'));
const TutorialLayout = lazy(() => import('../layouts/TutorialLayout.jsx'));
const About = lazy(() => import('../pages/About.jsx'));
const AiGuide = lazy(() => import('../pages/AiGuide.jsx'));
const CourseOverview = lazy(() => import('../pages/CourseOverview.jsx'));
const Exercises = lazy(() => import('../pages/Exercises.jsx'));
const Home = lazy(() => import('../pages/Home.jsx'));
const InterviewPrep = lazy(() => import('../pages/InterviewPrep.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));
const Projects = lazy(() => import('../pages/Projects.jsx'));
const SearchResults = lazy(() => import('../pages/SearchResults.jsx'));
const TutorialTopic = lazy(() => import('../pages/TutorialTopic.jsx'));
const Tutorials = lazy(() => import('../pages/Tutorials.jsx'));

function RouteFallback() {
  return (
    <main className="shell py-16">
      <section className="section-card text-sm text-[var(--text-soft)]">Loading page...</section>
    </main>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="tutorials" element={<Tutorials />} />
          <Route path="tutorials/:courseId" element={<TutorialLayout />}>
            <Route index element={<CourseOverview />} />
            <Route path=":topicId" element={<TutorialTopic />} />
          </Route>
          <Route path="search" element={<SearchResults />} />
          <Route path="assistant" element={<AiGuide />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="projects" element={<Projects />} />
          <Route path="interview-prep" element={<InterviewPrep />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;

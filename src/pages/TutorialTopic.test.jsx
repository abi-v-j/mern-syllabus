import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import { PortalProvider } from '../context/PortalContext.jsx';
import courses from '../data/courses.js';
import TutorialTopic from './TutorialTopic.jsx';

const course = courses.find((entry) => entry.courseId === 'web-development-basics');
const topic = course.topics[0];

function TopicOutletWrapper() {
  return <Outlet context={{ course }} />;
}

function renderTopicPage() {
  return render(
    <MemoryRouter initialEntries={[`/tutorials/${course.courseId}/${topic.topicId}`]}>
      <PortalProvider>
        <Routes>
          <Route path="/tutorials/:courseId" element={<TopicOutletWrapper />}>
            <Route path=":topicId" element={<TutorialTopic />} />
          </Route>
        </Routes>
      </PortalProvider>
    </MemoryRouter>,
  );
}

describe('TutorialTopic', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders clearer learning sections and a real-life example', () => {
    renderTopicPage();

    expect(screen.getByText('In simple words')).toBeInTheDocument();
    expect(screen.getByText('Why it matters')).toBeInTheDocument();
    expect(screen.getByText('Real-life example')).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.startsWith(
          'Imagine a student opens an online food delivery site to check menus and prices.',
        ),
      ),
    ).toBeInTheDocument();
  });

  it('lets learners complete and bookmark the current topic', async () => {
    const user = userEvent.setup();
    renderTopicPage();

    await user.click(screen.getByRole('button', { name: /mark as completed/i }));
    await user.click(screen.getByRole('button', { name: /^bookmark$/i }));

    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /bookmarked/i })).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem('mern-portal-completed'))).toMatchObject({
      'web-development-basics::how-the-web-works': true,
    });
    expect(JSON.parse(window.localStorage.getItem('mern-portal-bookmarks'))).toContain(
      'web-development-basics::how-the-web-works',
    );
  });
});

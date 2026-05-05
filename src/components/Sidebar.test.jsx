import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Sidebar from './Sidebar.jsx';
import courses from '../data/courses.js';
import { renderWithProviders } from '../test/renderWithProviders.jsx';

const course = courses.find((entry) => entry.courseId === 'web-development-basics');

describe('Sidebar', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows roadmap details for the active course', () => {
    renderWithProviders(
      <Sidebar course={course} currentTopicId="how-the-web-works" isOpen onClose={() => {}} />,
      { route: '/tutorials/web-development-basics/how-the-web-works' },
    );

    expect(screen.getByText('Course roadmap')).toBeInTheDocument();
    expect(screen.getByText('Web Development Basics')).toBeInTheDocument();
    expect(screen.getByText('Current: How the Web Works')).toBeInTheDocument();
    expect(screen.getByText('0/6 completed')).toBeInTheDocument();
  });

  it('filters topics inside the current course', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <Sidebar course={course} currentTopicId="how-the-web-works" isOpen onClose={() => {}} />,
      { route: '/tutorials/web-development-basics/how-the-web-works' },
    );

    await user.type(screen.getByLabelText(/find a topic/i), 'client');

    expect(screen.getByText('Client vs Server')).toBeInTheDocument();
    expect(screen.queryByText('How the Web Works')).not.toBeInTheDocument();
  });
});

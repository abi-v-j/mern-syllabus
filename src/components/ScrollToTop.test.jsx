import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.jsx';

describe('ScrollToTop', () => {
  it('scrolls to the top on link navigation', async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();

    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: scrollTo,
      writable: true,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Link to="/about">About</Link>} />
          <Route path="/about" element={<h1>About page</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /about/i }));

    expect(screen.getByRole('heading', { name: /about page/i })).toBeVisible();
    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  });
});

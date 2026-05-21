import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { screen } from '@testing-library/react';
import Home from './Home.jsx';
import { renderWithProviders } from '../test/renderWithProviders.jsx';

describe('accessibility smoke checks', () => {
  it('renders the home page without obvious axe violations', async () => {
    const { container } = renderWithProviders(<Home />);

    expect(
      screen.getByRole('heading', {
        name: /premium mern learning console/i,
      }),
    ).toBeInTheDocument();

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  }, 15_000);
});

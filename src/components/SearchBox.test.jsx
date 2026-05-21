import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { PortalProvider } from '../context/PortalContext.jsx';
import SearchBox from './SearchBox.jsx';

function LocationProbe() {
  const location = useLocation();

  return <p data-testid="location-probe">{location.pathname + location.search}</p>;
}

describe('SearchBox', () => {
  it('navigates to the search page when the user submits a query', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <PortalProvider>
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <SearchBox />
                  <LocationProbe />
                </>
              }
            />
          </Routes>
        </PortalProvider>
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/search courses and topics/i), 'jsonwebtoken');
    await user.keyboard('{Enter}');

    expect(screen.getByTestId('location-probe').textContent).toContain('/search?q=jsonwebtoken');
  });
});

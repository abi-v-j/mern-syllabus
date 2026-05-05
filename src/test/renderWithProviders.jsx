import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PortalProvider } from '../context/PortalContext.jsx';

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <PortalProvider>{ui}</PortalProvider>
    </MemoryRouter>,
  );
}

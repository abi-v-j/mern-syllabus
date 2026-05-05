import { MoonStar, SunMedium } from 'lucide-react';
import { usePortal } from '../context/PortalContext.jsx';

function ThemeToggle() {
  const { theme, toggleTheme } = usePortal();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn-secondary !px-3"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}

export default ThemeToggle;

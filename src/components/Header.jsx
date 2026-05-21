import { useEffect, useRef } from 'react';
import { Menu, GraduationCap, Bookmark, CheckCircle2 } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { usePortal } from '../context/PortalContext.jsx';
import SearchBox from './SearchBox.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const navItems = [
  { to: '/tutorials', label: 'Tutorials' },
  { to: '/assistant', label: 'AI Guide' },
  { to: '/exercises', label: 'Exercises' },
  { to: '/projects', label: 'Projects' },
  { to: '/interview-prep', label: 'Interview Prep' },
  { to: '/about', label: 'About' },
];

function navLinkClass({ isActive }) {
  return `whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-[var(--brand-soft)] text-[var(--brand-strong)]'
      : 'text-[var(--text-soft)] hover:bg-[var(--brand-soft)] hover:text-[var(--brand-strong)]'
  }`;
}

function Header({ onOpenSidebar, onCloseSidebar }) {
  const location = useLocation();
  const { completedCount, bookmarkedTopics } = usePortal();
  const isTutorialRoute = location.pathname.startsWith('/tutorials/');
  const headerRef = useRef(null);

  useEffect(() => {
    const headerElement = headerRef.current;

    if (!headerElement) {
      return undefined;
    }

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--portal-header-height',
        `${headerElement.offsetHeight}px`,
      );
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    resizeObserver.observe(headerElement);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-main)]/92 backdrop-blur-xl"
    >
      <div className="shell py-3">
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-float lg:flex-nowrap lg:px-5">
          <div className="flex items-center gap-3">
            {isTutorialRoute && (
              <button
                type="button"
                onClick={onOpenSidebar}
                className="btn-secondary lg:hidden"
                aria-label="Open course topics"
              >
                <Menu size={16} />
              </button>
            )}

            <Link to="/" className="flex items-center gap-3" onClick={onCloseSidebar}>
              <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--brand-strong)] text-white shadow-lg shadow-emerald-900/20">
                <GraduationCap size={20} />
              </span>
              <div>
                <p className="whitespace-nowrap text-lg font-extrabold tracking-tight text-[var(--text-main)]">
                  MERN Study Portal
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-faint)]">
                  Searchable learning system
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden shrink-0 items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} onClick={onCloseSidebar}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="order-3 w-full lg:order-none lg:ml-auto lg:min-w-0 lg:flex-[1_1_23rem] lg:max-w-lg">
            <SearchBox key={location.pathname} onNavigate={onCloseSidebar} />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <div className="hidden items-center gap-2 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-xs font-semibold text-[var(--text-soft)] md:flex">
              <CheckCircle2 size={14} className="text-[var(--brand)]" />
              <span>{completedCount} completed</span>
            </div>
            <div className="hidden items-center gap-2 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-xs font-semibold text-[var(--text-soft)] md:flex">
              <Bookmark size={14} className="text-[var(--accent)]" />
              <span>{bookmarkedTopics.length} saved</span>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <nav className="mt-3 flex flex-wrap gap-2 lg:hidden">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass} onClick={onCloseSidebar}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;

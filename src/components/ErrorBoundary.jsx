import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="shell py-16">
          <section className="mx-auto max-w-3xl rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-8 text-center shadow-float md:p-12">
            <p className="eyebrow">Unexpected error</p>
            <h1 className="headline mt-5 text-4xl font-bold">Something went wrong in the portal</h1>
            <p className="mt-4 text-sm leading-8 text-[var(--text-soft)]">
              The page hit an unexpected runtime error. Reload the portal and try again.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={this.handleReload} className="btn-primary">
                <RefreshCcw size={16} />
                Reload app
              </button>
              <span className="btn-secondary !cursor-default">
                <AlertTriangle size={16} />
                Fallback UI active
              </span>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

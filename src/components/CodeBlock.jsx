import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

function CodeBlock({ example }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="section-card overflow-hidden p-0">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
        <div>
          <p className="font-semibold text-[var(--text-main)]">{example.title}</p>
          <p className="text-sm text-[var(--text-soft)]">
            {example.mode === 'preview' ? 'Live preview available' : 'Editable reference snippet'}
          </p>
        </div>
        <button type="button" onClick={handleCopy} className="btn-secondary">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied' : 'Copy code'}
        </button>
      </div>

      <pre className="overflow-x-auto bg-[var(--code-bg)] p-5 text-sm leading-7 text-[var(--code-text)]">
        <code>{example.code}</code>
      </pre>
    </section>
  );
}

export default CodeBlock;

import { useState } from 'react';
import { Check, Copy, RotateCcw, PlayCircle } from 'lucide-react';

function buildPreviewDocument(html, css, js) {
  return `<!doctype html>
<html>
  <head>
    <style>
      body { margin: 0; padding: 1.5rem; }
      ${css}
    </style>
  </head>
  <body>
    ${html}
    <script>
      ${js}
    </script>
  </body>
</html>`;
}

function TryItEditor({ example }) {
  const [copied, setCopied] = useState(false);
  const [files, setFiles] = useState(() => example.files ?? {});
  const [code, setCode] = useState(example.code);

  const previewDocument = buildPreviewDocument(files.html ?? '', files.css ?? '', files.js ?? '');

  const handleCopy = async () => {
    const source =
      example.mode === 'preview'
        ? [files.html, files.css, files.js].filter(Boolean).join('\n\n')
        : code;

    await navigator.clipboard.writeText(source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const resetEditor = () => {
    setFiles(example.files ?? {});
    setCode(example.code);
  };

  if (example.mode === 'preview') {
    return (
      <section className="section-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-[var(--text-main)]">Try it yourself</p>
            <p className="text-sm text-[var(--text-soft)]">
              Edit the code and watch the preview update instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={resetEditor} className="btn-secondary">
              <RotateCcw size={16} />
              Reset code
            </button>
            <button type="button" onClick={handleCopy} className="btn-secondary">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy code'}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            {['html', 'css', 'js'].map((fileType) => (
              <label key={fileType} className="grid gap-2">
                <span className="pill w-fit uppercase">{fileType}</span>
                <textarea
                  value={files[fileType] ?? ''}
                  onChange={(event) =>
                    setFiles((currentFiles) => ({
                      ...currentFiles,
                      [fileType]: event.target.value,
                    }))
                  }
                  className="min-h-[160px] rounded-3xl border border-[var(--border)] bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100"
                />
              </label>
            ))}
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white">
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3 text-sm font-semibold text-slate-900">
              <PlayCircle size={16} className="text-emerald-600" />
              Live Preview
            </div>
            <iframe
              title={`${example.title} preview`}
              srcDoc={previewDocument}
              sandbox="allow-scripts"
              className="h-[620px] w-full bg-white"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-[var(--text-main)]">Editable practice editor</p>
          <p className="text-sm text-[var(--text-soft)]">
            This topic is better explained than executed directly in the browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={resetEditor} className="btn-secondary">
            <RotateCcw size={16} />
            Reset code
          </button>
          <button type="button" onClick={handleCopy} className="btn-secondary">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <textarea
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="min-h-[360px] rounded-[28px] border border-[var(--border)] bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100"
        />
        <div className="surface-soft rounded-[28px] p-5">
          <p className="pill w-fit">Expected output</p>
          <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{example.output}</p>
          <div className="mt-6 rounded-[24px] border border-dashed border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-[var(--text-soft)]">
            Use this editor to rewrite the snippet, rename variables, add comments, or convert the example into your own mini exercise.
          </div>
        </div>
      </div>
    </section>
  );
}

export default TryItEditor;

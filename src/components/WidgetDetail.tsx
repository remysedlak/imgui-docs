import { tagClass } from '../constants/styles';
import type { Widget } from '../types';
import { renderAlsoKnow } from '../utils/format';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface WidgetDetailProps {
  activeWidget: Widget | null;
  error: string | null;
  prevId: string | null;
  nextId: string | null;
  onSelectWidget: (id: string) => void;
  onCopyCode: () => Promise<void>;
  copyStatus: 'idle' | 'success' | 'error';
}

export function WidgetDetail({
  activeWidget,
  error,
  prevId,
  nextId,
  onSelectWidget,
  onCopyCode,
  copyStatus
}: WidgetDetailProps): React.JSX.Element {
  if (error) {
    return (
      <div className="rounded-sm border border-rose-300 bg-rose-50 p-5 text-rose-800">
        <p className="font-semibold">Failed to load imgui_widgets.json</p>
        <p className="mt-2 text-sm">Make sure it exists in public/ and restart the dev server.</p>
        <p className="mt-3 rounded-sm bg-white p-3 font-mono text-xs text-rose-900">{error}</p>
      </div>
    );
  }

  if (!activeWidget) {
    return (
      <div className="rounded-sm border border-stone-300 bg-stone-50 p-5 text-stone-700">
        Pick a widget from the left panel.
      </div>
    );
  }

  return (
    <article>
      <div className="mb-5 flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="break-words font-display text-2xl font-semibold text-stone-900 sm:text-3xl">{activeWidget.name}</h2>
          <div className="mt-2"><span className={tagClass[activeWidget.tag]}>{activeWidget.tag}</span></div>
        </div>
        <div className="relative flex-none">
          <button
            type="button"
            onClick={() => void onCopyCode()}
            className="rounded-sm border border-stone-300 bg-white px-3 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-stone-700 hover:bg-amber-50 sm:text-xs"
          >
            Copy code
          </button>
          {copyStatus !== 'idle' ? (
            <p
              className={`pointer-events-none absolute right-0 top-full mt-1 max-w-[220px] text-right text-xs sm:whitespace-nowrap ${copyStatus === 'success' ? 'text-emerald-700' : 'text-rose-700'}`}
              role="status"
              aria-live="polite"
            >
              {copyStatus === 'success' ? 'Copied to clipboard' : 'Could not copy'}
            </p>
          ) : null}
        </div>
      </div>

      <p className="mb-6 max-w-4xl text-sm leading-7 text-stone-700 sm:text-[15px]">{activeWidget.desc}</p>

      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-stone-500">Code</p>
        <SyntaxHighlighter
          language="cpp"
          style={oneLight}
          wrapLongLines
          customStyle={{
            margin: 0,
            padding: '1rem',
            borderRadius: '0.125rem',
            border: '1px solid rgb(214 211 209)',
            background: 'rgb(250 250 249)',
            fontSize: '0.875rem',
            lineHeight: 1.7,
            tabSize: 4
          }}
          codeTagProps={{ style: { fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace' } }}
        >
          {activeWidget.code}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 rounded-sm border border-stone-300 bg-stone-50 p-4 text-sm leading-7 text-stone-800">
        <p className="mb-1 text-xs uppercase tracking-[0.12em] text-stone-500">Note</p>
        <p>{activeWidget.note}</p>
      </div>

      {activeWidget.alsoknow?.length ? (
        <div dangerouslySetInnerHTML={{ __html: renderAlsoKnow(activeWidget.alsoknow) }} />
      ) : null}

      <div className="mt-8 flex flex-wrap gap-2 border-t border-stone-200 pt-5">
        <button
          type="button"
          disabled={!prevId}
          onClick={() => prevId && onSelectWidget(prevId)}
          className="rounded-sm border border-stone-300 px-3 py-2 text-sm text-stone-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-amber-50"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!nextId}
          onClick={() => nextId && onSelectWidget(nextId)}
          className="rounded-sm border border-stone-300 px-3 py-2 text-sm text-stone-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-amber-50"
        >
          Next
        </button>
      </div>
    </article>
  );
}

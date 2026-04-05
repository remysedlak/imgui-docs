import { tagClass } from '../constants/styles';
import type { Widget } from '../types';
import { formatCode, renderAlsoKnow } from '../utils/format';

interface WidgetDetailProps {
  activeWidget: Widget | null;
  error: string | null;
  prevId: string | null;
  nextId: string | null;
  onSelectWidget: (id: string) => void;
  onCopyCode: () => Promise<void>;
}

export function WidgetDetail({
  activeWidget,
  error,
  prevId,
  nextId,
  onSelectWidget,
  onCopyCode
}: WidgetDetailProps): React.JSX.Element {
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800">
        <p className="font-semibold">Failed to load imgui_widgets.json</p>
        <p className="mt-2 text-sm">Make sure it exists in public/ and restart the dev server.</p>
        <p className="mt-3 rounded bg-white p-3 font-mono text-xs text-red-900">{error}</p>
      </div>
    );
  }

  if (!activeWidget) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 text-zinc-700">
        Pick a widget from the left panel.
      </div>
    );
  }

  return (
    <article>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold text-zinc-900">{activeWidget.name}</h2>
          <div className="mt-2"><span className={tagClass[activeWidget.tag]}>{activeWidget.tag}</span></div>
        </div>
        <button
          type="button"
          onClick={() => void onCopyCode()}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.1em] text-zinc-700 hover:bg-zinc-100"
        >
          Copy code
        </button>
      </div>

      <p className="mb-6 max-w-4xl text-[15px] leading-7 text-zinc-700">{activeWidget.desc}</p>

      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-zinc-500">Code</p>
        <pre
          className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-7 text-zinc-900 [tab-size:4]"
          dangerouslySetInnerHTML={{ __html: formatCode(activeWidget.code) }}
        />
      </div>

      <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-7 text-zinc-800">
        <p className="mb-1 text-xs uppercase tracking-[0.12em] text-zinc-500">Note</p>
        <p>{activeWidget.note}</p>
      </div>

      {activeWidget.alsoknow?.length ? (
        <div dangerouslySetInnerHTML={{ __html: renderAlsoKnow(activeWidget.alsoknow) }} />
      ) : null}

      <div className="mt-8 flex flex-wrap gap-2 border-t border-zinc-200 pt-5">
        <button
          type="button"
          disabled={!prevId}
          onClick={() => prevId && onSelectWidget(prevId)}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-zinc-100"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!nextId}
          onClick={() => nextId && onSelectWidget(nextId)}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-zinc-100"
        >
          Next
        </button>
      </div>
    </article>
  );
}

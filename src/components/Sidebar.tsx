import type { FilterTag, Widget } from '../types';
import { tagClass } from '../constants/styles';

interface SidebarProps {
  widgets: Widget[];
  visibleWidgets: Widget[];
  activeId: string | null;
  searchTerm: string;
  activeTag: FilterTag;
  onSearchChange: (value: string) => void;
  onTagChange: (tag: FilterTag) => void;
  onSelectWidget: (id: string) => void;
}

export function Sidebar({
  widgets,
  visibleWidgets,
  activeId,
  searchTerm,
  activeTag,
  onSearchChange,
  onTagChange,
  onSelectWidget
}: SidebarProps): React.JSX.Element {
  const tags = ['all', ...new Set(widgets.map(widget => widget.tag))] as FilterTag[];

  return (
    <aside className="rounded-xl border border-zinc-200 bg-white p-4 lg:p-5">
      <div className="mb-4">
        <label htmlFor="search" className="mb-2 block text-xs uppercase tracking-[0.12em] text-zinc-500">Search widgets</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={event => onSearchChange(event.target.value)}
          placeholder="button, table, style..."
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-zinc-500">Tags</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => {
            const selected = tag === activeTag;
            const base = tag === 'all'
              ? 'inline-flex items-center rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700'
              : tagClass[tag];
            const selectedState = selected
              ? 'border-zinc-500 bg-zinc-200 text-zinc-900'
              : 'hover:border-zinc-400';

            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagChange(tag)}
                className={`${base} ${selectedState}`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Widget list</p>
        <span className="text-xs text-zinc-500">{visibleWidgets.length} shown</span>
      </div>

      <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1 lg:max-h-[calc(100vh-260px)]">
        {!visibleWidgets.length ? (
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600">
            No widgets match your filters.
          </div>
        ) : (
          visibleWidgets.map(widget => {
            const isActive = widget.id === activeId;
            const activeState = isActive
              ? 'border-zinc-400 bg-zinc-100 text-zinc-900'
              : 'border-transparent text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50';

            return (
              <button
                key={widget.id}
                type="button"
                onClick={() => onSelectWidget(widget.id)}
                className={`w-full rounded-lg border px-3 py-2 text-left ${activeState}`}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="font-display text-[15px] font-semibold">{widget.name}</span>
                  <span className={tagClass[widget.tag]}>{widget.tag}</span>
                </div>
                <p className="truncate text-xs text-zinc-600">{widget.desc}</p>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}

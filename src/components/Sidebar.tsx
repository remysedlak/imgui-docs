import type { FilterTag, Widget } from '../types';
import { tagClass } from '../constants/styles';

interface SidebarProps {
  className?: string;
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
  className,
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
    <aside className={`${className ?? ''} min-h-0 w-full max-w-full overflow-x-hidden rounded-sm border border-stone-300 bg-white/90 p-3 shadow-sm backdrop-blur sm:p-4 lg:p-5`}>
      <div className="mb-4">
        <label htmlFor="search" className="mb-2 block text-xs uppercase tracking-[0.12em] text-stone-500">Search widgets</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={event => onSearchChange(event.target.value)}
          placeholder="button, table, style..."
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-stone-500">Tags</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => {
            const selected = tag === activeTag;
            const base = tag === 'all'
              ? 'inline-flex items-center rounded-sm border border-stone-300 bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700'
              : tagClass[tag];
            const selectedState = selected
              ? 'border-stone-500 bg-stone-200 text-stone-900'
              : 'hover:border-stone-400';

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
        <p className="text-xs uppercase tracking-[0.12em] text-stone-500">Widget list</p>
        <span className="text-xs text-stone-500">{visibleWidgets.length} shown</span>
      </div>

      <div className="max-h-[52vh] space-y-2 overflow-x-hidden overflow-y-auto pr-1 sm:max-h-[60vh] lg:max-h-[calc(100vh-260px)]">
        {!visibleWidgets.length ? (
          <div className="rounded-sm border border-stone-300 bg-stone-50 p-3 text-sm text-stone-600">
            No widgets match your filters.
          </div>
        ) : (
          visibleWidgets.map(widget => {
            const isActive = widget.id === activeId;
            const activeState = isActive
              ? 'border-amber-300 bg-amber-50 text-stone-900'
              : 'border-transparent text-stone-700 hover:border-stone-300 hover:bg-stone-50';

            return (
              <button
                key={widget.id}
                type="button"
                onClick={() => onSelectWidget(widget.id)}
                className={`w-full max-w-full min-w-0 overflow-x-hidden rounded-sm border px-3 py-2 text-left ${activeState}`}
              >
                <div className="mb-1 flex min-w-0 items-center justify-between gap-2">
                  <span className="block min-w-0 max-w-full flex-1 truncate font-display text-[15px] font-semibold">{widget.name}</span>
                  <span className={`${tagClass[widget.tag]} shrink-0`}>{widget.tag}</span>
                </div>
                <p className="min-w-0 truncate text-xs text-stone-600">{widget.desc}</p>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}

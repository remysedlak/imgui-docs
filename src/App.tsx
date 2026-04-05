import { useEffect, useMemo, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { Sidebar } from './components/Sidebar';
import { WidgetDetail } from './components/WidgetDetail';
import type { FilterTag, Widget } from './types';

export function App() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<FilterTag>('all');
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mobilePanel, setMobilePanel] = useState<'browse' | 'detail'>('browse');

  useEffect(() => {
    let mounted = true;

    fetch('/imgui_widgets.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not load imgui_widgets.json');
        }
        return response.json() as Promise<Widget[]>;
      })
      .then(data => {
        if (!mounted) return;
        setWidgets(data);
        setActiveId(data[0]?.id ?? null);
      })
      .catch(loadError => {
        if (!mounted) return;
        setError(loadError instanceof Error ? loadError.message : 'Unknown error');
      });

    return () => {
      mounted = false;
    };
  }, []);

  const visibleWidgets = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return widgets.filter(widget => {
      const matchesTag = activeTag === 'all' || widget.tag === activeTag;
      if (!matchesTag) return false;
      if (!term) return true;

      const haystack = `${widget.name} ${widget.desc} ${widget.code} ${widget.note}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [widgets, searchTerm, activeTag]);

  useEffect(() => {
    if (!visibleWidgets.length) {
      setActiveId(null);
      setMobilePanel('browse');
      return;
    }

    const isActiveVisible = visibleWidgets.some(widget => widget.id === activeId);
    if (!isActiveVisible) {
      setActiveId(visibleWidgets[0].id);
    }
  }, [visibleWidgets, activeId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      if (!visibleWidgets.length || !activeId) return;

      const index = visibleWidgets.findIndex(widget => widget.id === activeId);
      if (index < 0) return;

      if (event.key === 'ArrowDown' && index < visibleWidgets.length - 1) {
        setActiveId(visibleWidgets[index + 1].id);
        event.preventDefault();
      }

      if (event.key === 'ArrowUp' && index > 0) {
        setActiveId(visibleWidgets[index - 1].id);
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [visibleWidgets, activeId]);

  const activeWidget = useMemo(
    () => visibleWidgets.find(widget => widget.id === activeId) ?? null,
    [visibleWidgets, activeId]
  );

  const handleSelectWidget = (id: string): void => {
    setActiveId(id);
    setMobilePanel('detail');
  };

  const activeIndex = activeWidget
    ? visibleWidgets.findIndex(widget => widget.id === activeWidget.id)
    : -1;

  const prevId = activeIndex > 0 ? visibleWidgets[activeIndex - 1].id : null;
  const nextId = activeIndex >= 0 && activeIndex < visibleWidgets.length - 1
    ? visibleWidgets[activeIndex + 1].id
    : null;

  const onCopyCode = async (): Promise<void> => {
    if (!activeWidget) return;
    try {
      await navigator.clipboard.writeText(activeWidget.code);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }
  };

  useEffect(() => {
    if (copyStatus === 'idle') return;

    const timer = window.setTimeout(() => {
      setCopyStatus('idle');
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [copyStatus]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1400px] overflow-x-hidden flex-col px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
      <AppHeader widgetCount={widgets.length} hasError={Boolean(error)} />

      <div className="mb-3 flex gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobilePanel('browse')}
          className={`flex-1 rounded-sm border px-3 py-2 text-sm ${mobilePanel === 'browse' ? 'border-amber-300 bg-amber-50 text-stone-900' : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'}`}
        >
          Browse
        </button>
        <button
          type="button"
          onClick={() => setMobilePanel('detail')}
          disabled={!activeWidget}
          className={`flex-1 rounded-sm border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 ${mobilePanel === 'detail' ? 'border-amber-300 bg-amber-50 text-stone-900' : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'}`}
        >
          Details
        </button>
      </div>

      <main className="grid min-w-0 flex-1 gap-4 lg:grid-cols-[330px_minmax(0,1fr)]">
        <Sidebar
          className={mobilePanel === 'browse' ? 'block' : 'hidden lg:block'}
          widgets={widgets}
          visibleWidgets={visibleWidgets}
          activeId={activeId}
          searchTerm={searchTerm}
          activeTag={activeTag}
          onSearchChange={setSearchTerm}
          onTagChange={setActiveTag}
          onSelectWidget={handleSelectWidget}
        />

        <section className={`${mobilePanel === 'detail' ? 'block' : 'hidden'} min-w-0 max-w-full overflow-x-hidden rounded-sm border border-stone-300 bg-white p-4 sm:p-6 lg:block lg:p-7 shadow-sm`}>
          <WidgetDetail
            activeWidget={activeWidget}
            error={error}
            prevId={prevId}
            nextId={nextId}
            onSelectWidget={setActiveId}
            onCopyCode={onCopyCode}
            copyStatus={copyStatus}
          />
        </section>
      </main>
    </div>
  );
}

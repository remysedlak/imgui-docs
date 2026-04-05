interface AppHeaderProps {
  widgetCount: number;
  hasError: boolean;
}

export function AppHeader({ widgetCount, hasError }: AppHeaderProps): React.JSX.Element {
  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-stone-300 bg-white/90 px-5 py-4 shadow-sm backdrop-blur">
      <div>
        <h1 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">ImGui Documentation</h1>
      </div>
      <div className="rounded-sm border border-stone-300 bg-amber-50 px-3 py-2 text-xs text-stone-700">
        {hasError ? 'Load failed' : `${widgetCount} widgets indexed`}
      </div>
    </header>
  );
}

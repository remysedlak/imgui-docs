interface AppHeaderProps {
  widgetCount: number;
  hasError: boolean;
}

export function AppHeader({ widgetCount, hasError }: AppHeaderProps): React.JSX.Element {
  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-stone-300 bg-white/90 px-4 py-3 shadow-sm backdrop-blur sm:gap-4 sm:px-5 sm:py-4">
      <div>
        <h1 className="font-display text-xl font-semibold text-stone-900 sm:text-3xl">Dear ImGui Documentation</h1>
        <p className="mt-1 text-xs text-stone-600 sm:text-sm">Fan-made reference. Not created by the Dear ImGui team.</p>
      </div>
      <div className="rounded-sm border border-stone-300 bg-amber-50 px-3 py-2 text-xs text-stone-700">
        {hasError ? 'Load failed' : `${widgetCount} widgets indexed`}
      </div>
    </header>
  );
}

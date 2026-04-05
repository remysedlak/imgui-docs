interface AppHeaderProps {
  widgetCount: number;
  hasError: boolean;
}

export function AppHeader({ widgetCount, hasError }: AppHeaderProps): React.JSX.Element {
  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white px-5 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">DoucketNation</p>
        <h1 className="font-display text-2xl font-semibold text-zinc-900 sm:text-3xl">ImGui Widget Atlas</h1>
        <p className="mt-1 text-sm text-zinc-600">Quick reference for practical ImGui widget usage.</p>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
        {hasError ? 'Load failed' : `${widgetCount} widgets indexed`}
      </div>
    </header>
  );
}

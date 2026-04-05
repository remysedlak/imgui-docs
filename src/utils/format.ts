export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function formatCode(code: string): string {
  return escapeHtml(code);
}

export function renderAlsoKnow(items?: string[]): string {
  if (!items?.length) {
    return '';
  }

  const lines = items
    .map(item => {
      const escaped = escapeHtml(item);
      const formatted = escaped.replace(
        /`([^`]+)`/g,
        '<code class="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[12px] text-zinc-900">$1</code>'
      );

      return `<li class="flex items-start gap-2 text-sm leading-6 text-zinc-700"><span class="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400"></span><span>${formatted}</span></li>`;
    })
    .join('');

  return `
    <div class="mt-6 border-t border-zinc-200 pt-4">
      <p class="mb-2 text-xs uppercase tracking-[0.12em] text-zinc-500">Also know</p>
      <ul class="space-y-1">${lines}</ul>
    </div>`;
}

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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
        '<code class="rounded-sm bg-amber-100 px-1.5 py-0.5 font-mono text-[12px] text-amber-900">$1</code>'
      );

      return `<li class="flex items-start gap-2 text-sm leading-6 text-stone-700"><span class="mt-2 h-1.5 w-1.5 rounded-sm bg-amber-500"></span><span>${formatted}</span></li>`;
    })
    .join('');

  return `
    <div class="mt-6 border-t border-stone-200 pt-4">
      <p class="mb-2 text-xs uppercase tracking-[0.12em] text-stone-500">Also know</p>
      <ul class="space-y-1">${lines}</ul>
    </div>`;
}

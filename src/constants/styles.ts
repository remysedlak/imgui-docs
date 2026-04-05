import type { WidgetTag } from '../types';

const tagPillBase = 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium';

export const tagClass: Record<WidgetTag, string> = {
  layout: `${tagPillBase} border border-zinc-300 bg-zinc-100 text-zinc-700`,
  style: `${tagPillBase} border border-zinc-300 bg-zinc-100 text-zinc-700`,
  input: `${tagPillBase} border border-zinc-300 bg-zinc-100 text-zinc-700`,
  container: `${tagPillBase} border border-zinc-300 bg-zinc-100 text-zinc-700`
};

import type { WidgetTag } from '../types';

const tagPillBase = 'inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-medium';

export const tagClass: Record<WidgetTag, string> = {
  layout: `${tagPillBase} border border-stone-300 bg-stone-100 text-stone-800`,
  style: `${tagPillBase} border border-stone-300 bg-stone-100 text-stone-800`,
  input: `${tagPillBase} border border-stone-300 bg-stone-100 text-stone-800`,
  container: `${tagPillBase} border border-stone-300 bg-stone-100 text-stone-800`
};

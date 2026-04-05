export type WidgetTag = 'layout' | 'style' | 'input' | 'container';

export type FilterTag = WidgetTag | 'all';

export interface Widget {
  id: string;
  name: string;
  tag: WidgetTag;
  desc: string;
  code: string;
  note: string;
  alsoknow?: string[];
}

import type { ColorSelectOption } from '@/components/ui/ColorSelect/ColorSelect';

export const TIME_BLOCK_COLOR_OPTIONS: readonly ColorSelectOption[] = [
  { value: 'tomato', color: '#ff6347', label: 'Tomato' },
  { value: 'orchid', color: '#da70d6', label: 'Orchid' },
  { value: 'coral', color: '#ff7f50', label: 'Coral' },
  { value: 'seagreen', color: '#2e8b57', label: 'Sea green' },
  { value: 'orange', color: '#ffa500', label: 'Orange' },
  { value: 'royalblue', color: '#4169e1', label: 'Royal blue' },
  { value: 'lightslategray', color: '#778899', label: 'Slate gray' },
];

export const DEFAULT_TIME_BLOCK_COLOR =
  TIME_BLOCK_COLOR_OPTIONS[TIME_BLOCK_COLOR_OPTIONS.length - 1]?.value ?? 'lightslategray';

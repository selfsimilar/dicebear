export function convertColor(color: string): string {
  return 'transparent' === color ? color : `#${color}`;
}

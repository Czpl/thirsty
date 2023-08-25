
export function calculatePercentage(watered: number, interval: number) {
  const now = Date.now();
  const startTime = watered;
  const endTime = watered + interval;
  const q = Math.abs(now - startTime);
  const d = Math.abs(endTime - startTime);
  const percent = 100 - Math.round(q / d * 100);
  if (percent < 0) return 0;
  if (percent > 100) return 100;
  return percent;
}

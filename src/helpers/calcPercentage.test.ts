
import { vi } from 'vitest';
import { calculatePercentage } from './calcPercentage';

describe('Water Progress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })
  it('should return 100 if recently watered', () => {
    const date = new Date(2000, 1, 1, 13);
    const wateredTimestamp = new Date(2000, 1, 1, 13).getTime();
    vi.setSystemTime(date)
    const percentage = calculatePercentage(wateredTimestamp, date.getTime());
    expect(percentage).toEqual(100);
  });

  it('should return 0 if time elapsed is bigger than the interval', () => {
    const date = new Date(2000, 1, 1, 14);
    const wateredTimestamp = new Date(2000, 1, 1, 12).getTime();
    vi.setSystemTime(date)
    const percentage = calculatePercentage(wateredTimestamp, 10);
    expect(percentage).toEqual(0);
  });
}); 
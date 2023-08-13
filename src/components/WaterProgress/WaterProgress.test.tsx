import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import WaterProgress from './WaterProgress';

describe('Water Progress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })
  it('should display 100% if plant is watered', () => {
    const date = new Date(2000, 1, 1, 13);
    const wateredTimestamp = new Date(2000, 1, 1, 13).getTime();
    vi.setSystemTime(date)
    render(<WaterProgress wateredTimestamp={wateredTimestamp} intervalToWater={1000 * 60 * 60 * 24} />);
    expect(screen.getByTestId('barFill')).toHaveStyle(`height:100%`);
  });
  it('should display 50% when there is half of the time remaining', () => {
    const date = new Date(2000, 1, 1, 12);
    const wateredTimestamp = new Date(2000, 1, 1, 0).getTime();
    vi.setSystemTime(date)
    render(<WaterProgress wateredTimestamp={wateredTimestamp} intervalToWater={1000 * 60 * 60 * 24} />);
    expect(screen.getByTestId('barFill')).toHaveStyle(`height:50%`);
  });
  it('should not display progress if plant needs to be watered', () => {
    const date = new Date(2001, 2, 1, 12);
    const wateredTimestamp = new Date(2000, 1, 1, 12).getTime();
    vi.setSystemTime(date)
    render(<WaterProgress wateredTimestamp={wateredTimestamp} intervalToWater={1000 * 60 * 60 * 24} />);
    expect(screen.getByTestId('barFill')).toHaveStyle(`height:0%`);

  });
}); 
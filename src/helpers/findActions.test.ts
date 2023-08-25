
import { vi } from 'vitest';
import findActions from './findActions';
import { TPlant } from '../types/appTypes';

describe('Water Progress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date);
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })
  
  it('should return 0 if no actions found', () => {
    const wateredTimestamp = new Date(2000, 1, 1, 13).getTime();
    const plants: TPlant[] = [{
      lastWateredTimestamp: wateredTimestamp,
      id: 'idstring',
      name: 'test',
      uid: 'uidstring', 
      wateringInterval: 10
    }]
    const actions = findActions(plants);
    expect(actions).toEqual(0);
  });

  it('should return 1 if one action found', () => {
    const wateredTimestamp = new Date(2000, 1, 1, 12).getTime();
    const plants: TPlant[] = [{
      lastWateredTimestamp: wateredTimestamp,
      id: 'idstring',
      name: 'test',
      uid: 'uidstring', 
      wateringInterval: 10
    }]
    const actions = findActions(plants);
    expect(actions).toEqual(1);
  });

  it('should return 2 if two found', () => {
    const wateredTimestamp = new Date(2000, 1, 1, 12).getTime();
    const plants: TPlant[] = [{
      lastWateredTimestamp: wateredTimestamp,
      id: 'idstring',
      name: 'test',
      uid: 'uidstring', 
      wateringInterval: 10
    },
    {
      lastWateredTimestamp: wateredTimestamp,
      id: 'idstring',
      name: 'test',
      uid: 'uidstring', 
      wateringInterval: 10
    }];
    const actions = findActions(plants);
    expect(actions).toEqual(2);
  });
}); 
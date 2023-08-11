import { render, screen } from '@testing-library/react';

import WaterProgress from './WaterProgress';

describe('Water Progress', () => {
  it('displays correct progress', () => {
    render(<WaterProgress wateredTimestamp={0} intervalToWater={0} />);

    screen.debug();

    // check if App components renders headline
  });
});
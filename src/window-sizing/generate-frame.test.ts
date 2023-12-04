import { generateWindowFrame } from './generate-frame';
import { ColumnIndex, WindowWidth } from './types';

describe('generateWindowFrame', () => {
  const mockScreen = {
    flippedVisibleFrame: jest.fn().mockReturnValue({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
    }),
  } as unknown as Screen;

  it.each([
    [0.25, 1, 0, { x: 0, y: 0, width: 250, height: 1000 }],
    [0.25, 2, 0, { x: 250, y: 0, width: 250, height: 1000 }],
    [0.25, 3, 0, { x: 500, y: 0, width: 250, height: 1000 }],
    [0.25, 4, 0, { x: 750, y: 0, width: 250, height: 1000 }],
    [0.25, 1, 10, { x: 10, y: 10, width: 237.5, height: 980 }],
    [0.25, 2, 10, { x: 257.5, y: 10, width: 237.5, height: 980 }],
    [0.25, 3, 10, { x: 505, y: 10, width: 237.5, height: 980 }],
    [0.25, 4, 10, { x: 752.5, y: 10, width: 237.5, height: 980 }],
    [0.3, 1, 0, { x: 0, y: 0, width: 333.33, height: 1000 }],
    [0.3, 2, 0, { x: 166.67, y: 0, width: 333.33, height: 1000 }],
    [0.3, 3, 0, { x: 667.67, y: 0, width: 333.33, height: 1000 }],
  ])(
    'Calculates window frames for width:%s, column:%s, padding:%s',
    (width, index, padding, expected) => {
      const frame = generateWindowFrame(
        mockScreen,
        width as WindowWidth,
        index as ColumnIndex,
        padding,
      );
      expect(frame).toEqual(expected);
    },
  );
});

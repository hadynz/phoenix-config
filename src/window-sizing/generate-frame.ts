import { ColumnIndex, WindowWidth } from './types';

export const generateWindowFrame = (
  screen: Screen,
  width: WindowWidth,
  index: ColumnIndex,
  padding: number,
): Rectangle => {
  const frame = screen.flippedVisibleFrame();

  // Number of windows that can fit on the screen based on the width
  const windowsCount = Math.round(1 / width);

  const windowWidth =
    (frame.width - padding * (windowsCount + 1)) / windowsCount;

  return {
    x: +(padding * index + windowWidth * (index - 1)).toFixed(2),
    y: frame.y + padding,
    width: +windowWidth.toFixed(2),
    height: frame.height - padding * 2,
  };
};

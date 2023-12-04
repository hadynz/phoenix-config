import { generateWindowFrame } from './generate-frame';
import { ColumnIndex, WindowWidth } from './types';

export type ResizeWindowOptions = {
  width: WindowWidth;
  index: ColumnIndex;
  padding?: number;
};

export const resizeWindow = ({
  width,
  index,
  padding = 0,
}: ResizeWindowOptions) => {
  const activeWindow = Window.focused();
  const screen = activeWindow?.screen();

  if (activeWindow && screen) {
    const frame = generateWindowFrame(screen, width, index, padding);
    activeWindow.setFrame(frame);
  }
};

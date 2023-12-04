import { generateWindowFrame } from './generate-frame';
import { ColumnIndex, CycleDirection, WindowWidth } from './types';

export type CycleWindowOptions = {
  direction: CycleDirection;
  width: WindowWidth;
  padding?: number;
};

export const cycleWindow = ({
  direction,
  width,
  padding = 0,
}: CycleWindowOptions) => {
  const activeWindow = Window.focused();
  const screen = activeWindow?.screen();

  if (!activeWindow || !screen) {
    return;
  }

  const frameCount = 1 / width;
  const frames = Array.from({ length: frameCount }, (_, i) =>
    generateWindowFrame(screen, width, (i + 1) as ColumnIndex, padding),
  );

  const currentFrame = activeWindow.frame();
  const currentIndex = frames.findIndex(
    (frame) => frame.x === currentFrame.x && frame.y === currentFrame.y,
  );
  const nextIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
  const nextFrame =
    frames[((nextIndex % frames.length) + frames.length) % frames.length];

  activeWindow.setFrame(nextFrame);
};

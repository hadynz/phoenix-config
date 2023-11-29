type WindowWidth = 0.2 | 0.25 | 0.5;
type ColumnIndex = 1 | 2 | 3 | 4 | 5;
type CycleDirection = 'left' | 'right';

const generateWindowFrame = (
  screen: Screen,
  width: WindowWidth,
  index: ColumnIndex,
  padding: number,
): Rectangle => {
  const frame = screen.flippedVisibleFrame();
  return {
    x: frame.x + frame.width * (index - 1) * width + padding,
    y: frame.y + padding,
    width: frame.width * width - padding * 2,
    height: frame.height - padding * 2,
  };
};

type ResizeWindowOptions = {
  width: WindowWidth;
  index: ColumnIndex;
  padding?: number;
};

const resizeWindowHandler = ({
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

type CycleWindowOptions = {
  direction: CycleDirection;
  width: WindowWidth;
  padding?: number;
};

const cycleWindowHandler = ({
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

export const resizeWindow = (
  modifiers: Phoenix.ModifierKey[],
  key: Phoenix.KeyIdentifier,
  options: ResizeWindowOptions,
) => {
  Key.on(key, modifiers, () => resizeWindowHandler(options));
};

export const cycleWindow = (
  modifiers: Phoenix.ModifierKey[],
  key: Phoenix.KeyIdentifier,
  options: CycleWindowOptions,
) => {
  Key.on(key, modifiers, () => cycleWindowHandler(options));
};

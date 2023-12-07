const printWindow = (window: Window) => {
  console.log(
    `${window.app().name()} - ${window.title()} - ${window.frame().x} `,
  );
};

const intersectsX = (rectangle1: Rectangle, rectangle2: Rectangle) => {
  return (
    rectangle1.x < rectangle2.x + rectangle2.width &&
    rectangle1.x + rectangle1.width > rectangle2.x
  );
};

type ShrinkWindowOptions = {
  toShrink: Window;
  relativeTo: Window;
};

export const shrinkWindow = ({ toShrink, relativeTo }: ShrinkWindowOptions) => {
  const toShrinkFrame = toShrink.frame();
  const relativeToFrame = relativeTo.frame();
  toShrink.setFrame({
    x: toShrinkFrame.x,
    y: toShrinkFrame.y,
    width: relativeToFrame.x - toShrinkFrame.x,
    height: toShrinkFrame.height,
  });
};

type ExpandWindowOptions = {
  from: Window;
  to: Window;
};

const expandWindow = ({ from, to }: ExpandWindowOptions) => {
  const fromFrame = from.frame();
  const toFrame = to.frame();
  from.setFrame({
    x: toFrame.x + toFrame.width,
    y: fromFrame.y,
    width: fromFrame.width + fromFrame.x - toFrame.width - toFrame.x,
    height: fromFrame.height,
  });
};

const shrinkOrExpand = (window: Window, neighbour: Window) => {
  const isOverlapping = intersectsX(window.frame(), neighbour.frame());
  if (isOverlapping) {
    shrinkWindow({ toShrink: window, relativeTo: neighbour });
  } else {
    expandWindow({ from: window, to: neighbour });
  }
};

const autoTileActiveWindow = () => {
  const activeWindow = Window.focused();
  if (activeWindow) {
    const eastNeighbours = activeWindow
      .neighbors('east')
      .filter((w) => w.isVisible());
    const westNeighbours = activeWindow
      .neighbors('west')
      .filter((w) => w.isVisible());

    // Resize x to the first neighbour
    if (westNeighbours.length > 0) {
      shrinkOrExpand(activeWindow, westNeighbours[0]);
    }

    console.log(`East neighbours: ${eastNeighbours.length}`);
    eastNeighbours.forEach(printWindow);
    console.log(`West neighbours: ${westNeighbours.length}`);
    westNeighbours.forEach(printWindow);
  }
};

export const tileWindows = (
  modifiers: Phoenix.ModifierKey[],
  key: Phoenix.KeyIdentifier,
) => {
  Key.on(key, modifiers, () => autoTileActiveWindow());
};

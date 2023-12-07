const printWindow = (window: Window) => {
  console.log(
    `${window.app().name()} - ${window.title()} - ${window.frame().x} `,
  );
};

const isIntersectingX = (rectangle1: Rectangle, rectangle2: Rectangle) => {
  return (
    rectangle1.x < rectangle2.x + rectangle2.width &&
    rectangle1.x + rectangle1.width > rectangle2.x
  );
};

const isOverlappingX = (rectangle1: Rectangle, rectangle2: Rectangle) => {
  return (
    rectangle1.x <= rectangle2.x &&
    rectangle1.x + rectangle1.width >= rectangle2.x + rectangle2.width
  );
};

type ShrinkWindowOptions = {
  toShrink: Window;
  relativeTo: Window;
};

export const shrinkWindow = ({ toShrink, relativeTo }: ShrinkWindowOptions) => {
  const toShrinkFrame = toShrink.frame();
  const relativeToFrame = relativeTo.frame();

  const isOverlapping = isOverlappingX(relativeToFrame, toShrinkFrame);
  if (isOverlapping) {
    return; // Complete overlap... no shrinking required
  }

  const isLeftOfRelativeTo = toShrinkFrame.x < relativeToFrame.x;
  toShrink.setFrame({
    x: isLeftOfRelativeTo
      ? toShrinkFrame.x
      : relativeToFrame.x + relativeToFrame.width,
    y: toShrinkFrame.y,
    width: isLeftOfRelativeTo
      ? relativeToFrame.x - toShrinkFrame.x
      : toShrinkFrame.x +
        toShrinkFrame.width -
        relativeToFrame.x -
        relativeToFrame.width,
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
  const isOverlapping = isIntersectingX(window.frame(), neighbour.frame());
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type DesktopIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const moveActiveWindowToDesktop = async (index: DesktopIndex) => {
  const activeWindow = Window.focused();
  const space = Space.all()[index - 1];

  if (activeWindow && space) {
    space.moveWindows([activeWindow]);
    await sleep(40);
    activeWindow.focus();
  }
};

export const moveToSpace = (
  modifiers: Phoenix.ModifierKey[],
  key: Phoenix.KeyIdentifier,
  index: DesktopIndex,
) => {
  Key.on(key, modifiers, () => moveActiveWindowToDesktop(index));
};

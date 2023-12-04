import {
  cycleWindow as cycleWindowHandler,
  CycleWindowOptions,
} from './cycle-window';
import {
  resizeWindow as resizeWindowHandler,
  ResizeWindowOptions,
} from './resize-window';

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

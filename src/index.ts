import { ShiftHyperKey } from './constants';
import { moveToSpace } from './move-to-space';
import { recall } from './recall-app';
import { tileWindows } from './tiling';
import { cycleWindow, resizeWindow } from './window-sizing';

Phoenix.set({
  daemon: true,
  openAtLogin: true,
});

recall(ShiftHyperKey, 't', 'Things', { launchAppName: 'Things3' });
recall(ShiftHyperKey, 'o', 'Obsidian');
recall(ShiftHyperKey, 'w', 'Warp');
recall(ShiftHyperKey, 's', 'Slack', { moveToCurrentSpace: false });

moveToSpace(ShiftHyperKey, '1', 1);
moveToSpace(ShiftHyperKey, '2', 2);
moveToSpace(ShiftHyperKey, '3', 3);
moveToSpace(ShiftHyperKey, '4', 4);
moveToSpace(ShiftHyperKey, '5', 5);
moveToSpace(ShiftHyperKey, '6', 6);
moveToSpace(ShiftHyperKey, '7', 7);
moveToSpace(ShiftHyperKey, '8', 8);
moveToSpace(ShiftHyperKey, '9', 9);

const padding = 0;

resizeWindow(ShiftHyperKey, '1', { width: 0.2, index: 1, padding });
resizeWindow(ShiftHyperKey, '2', { width: 0.5, index: 2, padding });
resizeWindow(ShiftHyperKey, '3', { width: 0.25, index: 3, padding });
resizeWindow(ShiftHyperKey, '4', { width: 0.25, index: 4, padding });

cycleWindow(ShiftHyperKey, 'p', { direction: 'left', width: 0.5, padding });
cycleWindow(ShiftHyperKey, '[', { direction: 'right', width: 0.5, padding });

tileWindows(ShiftHyperKey, 'l');

Phoenix.notify('Phoenix configuration reloaded');

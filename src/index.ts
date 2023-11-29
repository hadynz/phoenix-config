import { cycleWindow, resizeWindow } from './windowSizing';
import { ShiftHyperKey } from './modifiers';
import { moveToSpace } from './moveToSpace';
import { recall } from './recallApp';

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

const padding = 10;

resizeWindow(ShiftHyperKey, 'q', { width: 0.25, index: 1, padding });
resizeWindow(ShiftHyperKey, 'e', { width: 0.25, index: 3, padding });
resizeWindow(ShiftHyperKey, 'r', { width: 0.25, index: 4, padding });

cycleWindow(ShiftHyperKey, 'p', { direction: 'left', width: 0.25, padding });
cycleWindow(ShiftHyperKey, '[', { direction: 'right', width: 0.25, padding });

const screenFrame = Screen.main().flippedVisibleFrame();
const modal = new Modal();
modal.isInput = true;
modal.appearance = 'light';
modal.origin = {
  x: screenFrame.width / 2 - modal.frame().width / 2,
  y: screenFrame.height / 2 - modal.frame().height / 2,
};
modal.textDidChange = (value) => {
  console.log('Text did change:', value);
};

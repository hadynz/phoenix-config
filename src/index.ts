import { HyperKey, ShiftHyperKey } from './key';
import { recallApp } from './recallApp';

Key.on('t', HyperKey, () =>
  recallApp({
    appName: 'Things',
    launchAppName: 'Things3',
    toggleWhenActive: true,
    moveToCurrentSpace: true,
  }),
);

Key.on('t', ShiftHyperKey, () =>
  recallApp({
    appName: 'Terminal',
    toggleWhenActive: true,
    moveToCurrentSpace: true,
  }),
);
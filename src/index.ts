import { HyperKey, ShiftHyperKey } from './modifiers';
import { recallApp } from './recallApp';

Key.on(
  't',
  HyperKey,
  recallApp({
    appName: 'Things',
    launchAppName: 'Things3',
  }),
);

Key.on(
  't',
  ShiftHyperKey,
  recallApp({
    appName: 'Terminal',
  }),
);

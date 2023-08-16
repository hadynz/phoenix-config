import { HyperKey } from './key';
import { recallApp } from './recallApp';

Key.on('t', HyperKey, () =>
  recallApp({
    appName: 'Things',
    launchAppName: 'Things3',
    toggleWhenActive: true,
    moveToCurrentSpace: true,
  }),
);

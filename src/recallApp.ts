const launchApp = (appName: string) => {
  App.launch(appName, { focus: true });
};

type RecallAppOptions = {
  appName: string;
  launchAppName?: string;
  toggleWhenActive?: boolean;
  moveToCurrentSpace?: boolean;
};

/**
 * Recalls an application to the current active space by either launching or focusing it
 */
const recallApp =
  ({
    appName,
    launchAppName,
    toggleWhenActive = true,
    moveToCurrentSpace = true,
  }: RecallAppOptions) =>
  () => {
    const app = App.get(appName);

    if (app == null) {
      launchApp(launchAppName || appName);
    } else if (app.isActive() && toggleWhenActive) {
      app.hide();
    } else {
      if (moveToCurrentSpace) {
        const space = Space.active();
        space?.moveWindows([app.mainWindow() as Window, ...app.windows()]);
      }
      launchApp(launchAppName || appName);
    }
  };

export const recall = (
  modifiers: Phoenix.ModifierKey[],
  key: Phoenix.KeyIdentifier,
  appName: string,
  launchAppName?: string,
) => {
  Key.on(
    key,
    modifiers,
    recallApp({
      appName,
      launchAppName,
    }),
  );
};

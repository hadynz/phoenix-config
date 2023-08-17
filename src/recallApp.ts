const launchApp = (appName: string) => {
  App.launch(appName, { focus: true });
};

type RecallAppOptions = {
  appName: string;
  launchAppName?: string;
  toggleWhenActive: boolean;
  moveToCurrentSpace: boolean;
};

/**
 * Recalls a given application by either launching or focusing it
 */
export const recallApp = (options: RecallAppOptions) => {
  const { appName, launchAppName, toggleWhenActive, moveToCurrentSpace } =
    options;
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

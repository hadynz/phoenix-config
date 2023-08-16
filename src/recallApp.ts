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
  const { appName, launchAppName, toggleWhenActive: toggleActive, moveToCurrentSpace } = options;
  const app = App.get(appName);

  if (app == null) {
    App.launch(launchAppName || appName, { focus: true });
  } else if (app.isActive() && toggleActive) {
    app.hide();
  } else {
    if (moveToCurrentSpace) {
      const space = Space.active();
      space?.moveWindows([app.mainWindow() as Window, ...app.windows()]);
    }
    app.focus();
  }
}
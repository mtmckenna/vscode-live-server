import { StatusBarItem, window, StatusBarAlignment } from "vscode";
import { Config } from "./Config";
export class StatusbarUi {
  private static _statusBarItem: StatusBarItem;

  private static get statusbar() {
    if (!StatusbarUi._statusBarItem) {
      StatusbarUi._statusBarItem = window.createStatusBarItem(
        StatusBarAlignment.Right,
        100
      );

      // Show status bar only if user wants :)
      if (Config.getShowOnStatusbar) this.statusbar.show();
    }

    return StatusbarUi._statusBarItem;
  }

  static Init() {
    StatusbarUi.Live();
  }

  static Working(workingMsg: string = "Working on it...") {
    StatusbarUi.statusbar.text = `$(pulse) ${workingMsg}`;
    StatusbarUi.statusbar.tooltip =
      "In case if it takes long time, try to close all browser window.";
    StatusbarUi.statusbar.command = null;
  }

  public static Live() {
    StatusbarUi.statusbar.text = "$(broadcast) Go Live";
    StatusbarUi.statusbar.command = "extension.liveShaders.goOnline";
    StatusbarUi.statusbar.tooltip = "Click to run mm live server";
  }

  public static Offline(port: Number) {
    StatusbarUi.statusbar.text = `$(circle-slash) Port : ${port}`;
    StatusbarUi.statusbar.command = "extension.liveShaders.goOffline";
    StatusbarUi.statusbar.tooltip = "Click to close server";
  }

  public static dispose() {
    StatusbarUi.statusbar.dispose();
  }
}

import { Memento, extensions, window } from "vscode";
import * as opn from "opn";

export const SETUP_STRING = "liveShaders.setup.version";

export async function checkNewAnnouncement(memento: Memento) {
  const packageJSON = extensions.getExtension(
    "mtmckenna.LiveShaders"
  ).packageJSON;
  const announment = packageJSON.announcement;

  if (!announment && Object.keys(announment).length === 0) return;

  const stateVersion = (await memento.get(SETUP_STRING)) || "0.0.0";
  const installedVersion = packageJSON.version;

  if (
    stateVersion !== installedVersion &&
    installedVersion === announment.onVersion
  ) {
    await memento.update(SETUP_STRING, installedVersion);
    const showDetails = "Show Details";
    const choice = await window.showInformationMessage(
      announment.message,
      showDetails
    );
    if (choice === showDetails) {
      const url =
        announment.url || "https://github.com/ritwickdey/vscode-live-server";
      opn(url);
    }
  }
}

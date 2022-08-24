"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const electron = require("electron");
const os$1 = require("os");
const path = require("path");
const promises = require("node:fs/promises");
const node_fs = require("node:fs");
const os = require("node:os");
const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
const os__default = /* @__PURE__ */ _interopDefaultLegacy(os);
function managerAdds() {
  electron.ipcMain.handle("createDir", async () => {
    const dir = os__default.default.homedir();
    try {
      await promises.access(`${dir}/Pictures/ManagerEmojis`, node_fs.constants.F_OK | node_fs.constants.X_OK);
    } catch {
      try {
        await promises.mkdir(`${dir}/Pictures/ManagerEmojis`);
      } catch {
        return false;
      }
    }
    return true;
  });
  electron.ipcMain.handle("cpImg", async (event, file) => {
    const dir = os__default.default.homedir();
    console.log(dir);
    console.log(file);
    try {
      await promises.cp(file.path, `${dir}/Pictures/ManagerEmojis/${file.name}`);
    } catch (err) {
      console.log(err);
    }
  });
}
if (os$1.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const ROOT_PATH = {
  dist: path.join(__dirname, "../.."),
  public: path.join(__dirname, electron.app.isPackaged ? "../.." : "../../../public")
};
let win = null;
const preload = path.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = path.join(ROOT_PATH.dist, "index.html");
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Main window",
    icon: path.join(ROOT_PATH.public, "favicon.svg"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (electron.app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
  }
  const contents = win.webContents;
  contents.toggleDevTools();
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", new Date().toLocaleString());
  });
  win.webContents.setWindowOpenHandler(({ url: url2 }) => {
    if (url2.startsWith("https:"))
      electron.shell.openExternal(url2);
    return { action: "deny" };
  });
}
electron.app.whenReady().then(() => {
  managerAdds();
  createWindow();
});
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
electron.ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new electron.BrowserWindow({
    webPreferences: {
      preload
    }
  });
  if (electron.app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
  }
});
exports.ROOT_PATH = ROOT_PATH;

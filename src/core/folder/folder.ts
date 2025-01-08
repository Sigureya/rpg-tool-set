import fs from "node:fs/promises";
import pathLib from "path";

import type { FolderTraits } from "./types/trait";
import { resolvePath } from "./path";
export class Folder {
  readonly _basePath: string;
  readonly _setting: FolderTraits<unknown>;
  constructor(basePath: string, setting: FolderTraits<unknown>) {
    this._basePath = basePath;
    this._setting = { ...setting };
  }
  get ext() {
    return this._setting.ext;
  }
  mkDir(): Promise<void> {
    return fs.mkdir(this._basePath);
  }
  childFolders() {
    fs.readdir(this._basePath);
    //  fs.readdir();
  }
  files(childPath: string = "") {
    const path = resolvePath(this._basePath, childPath);
  }
}

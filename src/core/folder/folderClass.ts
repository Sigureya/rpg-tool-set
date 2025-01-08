import fs from "node:fs/promises";

import type { FolderTraits } from "./types/trait";
import { resolvePath } from "./path";
import type { Dirent } from "node:fs";

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
  resolvePath(name: string) {
    return resolvePath(this._basePath, name);
  }
  async readDir(childPath: string = ""): Promise<Dirent[]> {
    const path = resolvePath(this._basePath, childPath);
    return fs.readdir(path, {
      withFileTypes: true,
      recursive: true,
    });
  }
  async files(childPath: string = ""): Promise<Dirent[]> {
    const list = await this.readDir(childPath);
    // 取得に僅かな手間がかかるので、予め捕まえておく
    const ext = this.ext;
    return list.filter(
      (dirent) => dirent.isFile() && dirent.name.endsWith(ext)
    );
  }
  async childFolders(childPath: string = ""): Promise<Dirent[]> {
    const list = await this.readDir(childPath);
    return list.filter((dirent) => dirent.isDirectory());
  }

  // 指定したフォルダをまとめて取得する
  folders(x: string[]) {}

  async folderExsits(name: string = "") {
    try {
      const path = this.resolvePath(name);
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }
}

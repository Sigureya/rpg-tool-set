import type { Dirent } from "node:fs";
import { extractFolders } from "./utils";
import type { FileDataType, FolderTraits, FsLib, Libs, PathLib } from "./types";
import { validatePath } from "./validatePath";
import type { FileFolderInterFace } from "./types/fileFolderInterface";

export type FileFolderFromTraits<T extends FolderTraits<unknown>> = FileFolder<
  Parameters<T["toFileData"]>[0]
>;

export class FileFolder<T> implements FileFolderInterFace {
  readonly _basePath: string;
  readonly _setting: Readonly<FolderTraits<T>>;
  private _fileSystem: FsLib;
  private _pathLib: PathLib;

  constructor(libs: Libs, basePath: string, setting: FolderTraits<T>) {
    this._pathLib = libs.path;
    this._fileSystem = libs.fileSystem;
    this._basePath = libs.path.resolve(basePath);
    this._setting = setting;
  }

  // 拡張子取得
  get ext() {
    return this._setting.ext;
  }
  // ベースパス取得
  get basePath() {
    return this._basePath;
  }
  // パス解決と検証
  resolvePath(name: string = ""): string {
    const resolvedPath = this._pathLib.resolve(this._basePath, name);
    // パスの検証。問題があるなら例外が発生する
    validatePath(this._pathLib, resolvedPath, this._basePath);
    return resolvedPath;
  }

  // ファイル名を元にフルパス解決
  resolveFilenamePath(filename: string): string {
    return this.resolvePath(`${filename}${this.ext}`);
  }

  // ディレクトリ作成
  async mkDir(): Promise<void> {
    try {
      await this._fileSystem.mkdir(this._basePath, { recursive: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
        throw error;
      }
    }
  }

  // ファイル読み込み
  async read(filename: string): Promise<T> {
    const path = this.resolveFilenamePath(filename);
    const buffer = await this._fileSystem.readFile(path);
    return this._setting.readFile(buffer, path);
  }

  // ファイル書き込み
  async write(filename: string, data: T): Promise<void> {
    await this.mkDir();
    const path = this.resolveFilenamePath(filename);
    const fileData: FileDataType = this._setting.toFileData(data);
    await this._fileSystem.writeFile(path, fileData);
  }

  // デフォルトデータを元にファイル作成
  async makeFile(filename: string): Promise<void> {
    const path = this.resolveFilenamePath(filename);
    const data: FileDataType = this._setting.makeDefault(filename);
    await this._fileSystem.writeFile(path, data);
  }

  // ディレクトリ内の内容を取得
  async readDir(childPath: string = ""): Promise<Dirent[]> {
    const path = this.resolvePath(childPath);
    try {
      return await this._fileSystem.readdir(path, { withFileTypes: true });
    } catch {
      throw new Error(`Failed to read directory: ${path}`);
    }
  }

  // 指定された拡張子を持つファイル一覧を取得
  async getFiles(childPath: string = ""): Promise<Dirent[]> {
    const list = await this.readDir(childPath);
    return list.filter(
      (dirent) => dirent.isFile() && dirent.name.endsWith(this.ext)
    );
  }

  // 子フォルダ一覧を取得
  async getChildFolders(childPath: string = ""): Promise<Dirent[]> {
    const list = await this.readDir(childPath);
    return list.filter((dirent) => dirent.isDirectory());
  }

  // 指定された名前のフォルダが存在するか確認
  async folderExists(name: string): Promise<boolean> {
    try {
      const path = this.resolvePath(name);
      await this._fileSystem.access(path);
      return true;
    } catch {
      return false;
    }
  }

  // 指定されたフォルダを抽出
  async extractFolders(targets: ReadonlySet<string>): Promise<Dirent[]> {
    const path = this.resolvePath();
    return extractFolders(path, targets);
  }

  // ベースパス直下のフォルダを取得
  async listBaseFolders(): Promise<Dirent[]> {
    const list = await this._fileSystem.readdir(this._basePath, {
      withFileTypes: true,
    });
    return list.filter((dirent) => dirent.isDirectory());
  }
}

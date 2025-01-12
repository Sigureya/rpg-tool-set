import type { FileFolder } from "./folderClass";
import type { FolderTraits, Libs } from "./types";
import type { FolderTable } from "./utils2";
import { createFolders } from "./utils2";

export class FileFoldersManager<
  FoldersType extends Record<PropertyKey, FolderTraits<any>>
> {
  private readonly _folders: FolderTable<FoldersType>;
  private readonly _basePath: string;

  constructor(libs: Libs, basePath: string, folderTraits: FoldersType) {
    this._basePath = libs.path.resolve(basePath);
    this._folders = createFolders(
      basePath,
      libs,
      folderTraits
    ) as FolderTable<FoldersType>;
  }
  get base() {
    return this._basePath;
  }

  // ディレクトリ作成
  async mkDir(): Promise<void> {
    await Promise.all(
      Object.values(this._folders).map((folder) => folder.mkDir())
    );
  }

  // 子フォルダ取得
  get children() {
    return this._folders;
  }
  childFolders(): FileFolder<unknown>[] {
    return Object.values<FileFolder<unknown>>(this._folders);
  }
}

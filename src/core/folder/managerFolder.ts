import type { FileFolderFromTraits } from "./folderClass";
import { FileFolder } from "./folderClass";
import type { FolderTraits, Libs } from "./types";

type FolderTable<
  FoldersType extends Record<PropertyKey, FolderTraits<unknown>>
> = {
  [Key in keyof FoldersType]: FileFolderFromTraits<FoldersType[Key]>;
};
export class FileFoldersManager<
  FoldersType extends Record<PropertyKey, FolderTraits<unknown>>
> {
  private readonly _folders: FolderTable<FoldersType>;
  private readonly _basePath: string;
  private readonly _libs: Libs;

  constructor(libs: Libs, basePath: string, folderTraits: FoldersType) {
    this._basePath = libs.path.resolve(basePath);
    this._folders = createFolders(
      basePath,
      libs,
      folderTraits
    ) as FolderTable<FoldersType>;
    this._libs = libs;
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
}

const createFolders = <
  FoldersType extends Record<PropertyKey, FolderTraits<unknown>>
>(
  basePath: string,
  libs: Libs,
  folderTraits: FoldersType
) => {
  return Object.keys(folderTraits).reduce(
    (acc, key: string & keyof FolderTable<FoldersType>) => {
      acc[key] = new FileFolder(
        libs,
        libs.path.resolve(basePath, key),
        folderTraits[key as keyof FoldersType]
      );
      return acc;
    },
    {} as Record<keyof FoldersType, FileFolder<unknown>>
  );
};

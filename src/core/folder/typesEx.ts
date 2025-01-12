import type { FileFolder } from "./folderClass";

export type FileFolderTable = Record<string, FileFolder<unknown>>;
export type FileFolderTableFromNames<
  T,
  Names extends ReadonlyArray<string>
> = Record<Names[number], FileFolder<T>>;

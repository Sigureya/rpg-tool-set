import { FileFolder } from "./folderClass";
import type { FolderTraits, Libs } from "./types";

export const xxx = <T, List extends ReadonlyArray<string>>(
  libs: Libs,
  basePath: string,
  traits: FolderTraits<T>,
  childrens: List
): Record<List[number], FileFolder<T>> => {
  return childrens.reduce((table, folderName) => {
    table[folderName] = new FileFolder(libs, basePath, traits);
    return table;
  }, {} as Record<string, FileFolder<T>>);
};

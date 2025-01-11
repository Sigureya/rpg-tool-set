import { FileFolder } from "./folderClass";
import type { FolderTraits, Libs } from "./types";
import { validatePath } from "./validatePath";

export const createFolderTable = <T, List extends ReadonlyArray<string>>(
  libs: Libs,
  basePath: string,
  traits: FolderTraits<T>,
  childrens: List
): Record<List[number], FileFolder<T>> => {
  const basePathResolved = libs.path.resolve(basePath);
  return childrens.reduce((table, folderName) => {
    const path = libs.path.resolve(basePathResolved, folderName);
    validatePath(libs.path, path, basePathResolved);
    table[folderName] = new FileFolder(libs, path, traits);
    return table;
  }, {} as Record<string, FileFolder<T>>);
};

import { FileFoldersManager } from "./fileFolderManager";
import type { FileFolderFromTraits } from "./folderClass";
import { FileFolder } from "./folderClass";
import type { FolderTraits, Libs } from "./types";
import type { FileFolderTable } from "./typesEx";
import { validatePath } from "./validatePath";

export type FolderTable<
  FoldersType extends Record<PropertyKey, FolderTraits<unknown>>
> = {
  [Key in keyof FoldersType]: FileFolderFromTraits<FoldersType[Key]>;
};

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
export const createFolders = <
  FoldersType extends Record<PropertyKey, FolderTraits<unknown>>
>(
  basePath: string,
  libs: Libs,
  folderTraits: FoldersType
): FolderTable<FoldersType> => {
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
  ) as FolderTable<FoldersType>;
};

export const createFileFolderManager = <
  FoldersType extends Record<PropertyKey, FolderTraits<any>>
>(
  libs: Libs,
  basePath: string,
  folderTraits: FoldersType
) => {
  const basePathResolved = libs.path.resolve(basePath);
  return new FileFoldersManager(libs, basePathResolved, folderTraits);
};

const canMerge = (list: FileFolderTable[]) => {
  const nameList = list.flatMap((f) => Object.keys(f));
  const set: ReadonlySet<string> = new Set(nameList);
  return set.size === nameList.length;
};

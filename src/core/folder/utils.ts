import { readdir } from "fs/promises";

export const areExtentionsMatch = (
  dirent: { name: string },
  extentions: ReadonlyArray<string>
) => {
  return extentions.some((ext) => dirent.name.endsWith(ext));
};

export const collectFiles = async (
  basePath: string,
  extentions: ReadonlyArray<string>
) => {
  const list = await readdir(basePath, {
    recursive: true,
    withFileTypes: true,
  });
  return list.filter(
    (dirent) => dirent.isFIFO() && areExtentionsMatch(dirent, extentions)
  );
};
export const extractFolders = async (
  basePath: string,
  targets: ReadonlySet<string>
) => {
  const list = await readdir(basePath, { withFileTypes: true });
  return list.filter(
    (dirent) => dirent.isDirectory() && targets.has(dirent.name)
  );
};

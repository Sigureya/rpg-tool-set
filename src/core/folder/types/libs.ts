import type fs from "node:fs/promises";
import type path from "node:path";
export interface Libs {
  fileSystem: FsLib;
  path: PathLib;
}
export type PathLib = Pick<typeof path, "resolve" | "basename">;
export type FsLib = Pick<
  typeof fs,
  "mkdir" | "access" | "readFile" | "writeFile" | "readdir"
>;

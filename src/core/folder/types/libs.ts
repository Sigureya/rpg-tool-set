import type fs from "node:fs/promises";
import type path from "node:path";
export interface Libs {
  fileSystem: typeof fs;
  path: typeof path;
}

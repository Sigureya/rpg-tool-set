import type Lib from "node:path";

const forbiddenNames: ReadonlySet<string> = new Set([
  "CON",
  "PRN",
  "AUX",
  "NUL",
  ".htaccess",
] as const);

export const validatePath = (
  pathLib: typeof Lib,
  fullPath: string,
  basePath: string
) => {
  if (fullPath.length > 254) {
    throw new Error(`path long`);
  }

  const baseName = pathLib.basename(fullPath);
  if (forbiddenNames.has(baseName)) {
    throw new Error(`forbidden name:${baseName}`);
  }
  if (!fullPath.startsWith(basePath)) {
    throw new Error(
      `Invalid path: ${fullPath} is outside the base path ${basePath}`
    );
  }
};

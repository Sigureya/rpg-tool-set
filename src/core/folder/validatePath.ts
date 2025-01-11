import type { PathLib } from "./types";

const forbiddenNames: ReadonlySet<string> = new Set([
  "CON",
  "PRN",
  "AUX",
  "NUL",
  ".htaccess",
] as const);

export const validatePath = (
  pathLib: PathLib,
  fullPath: string,
  basePath: string
) => {
  if (fullPath.length > 254) {
    throw new Error(`path long`);
  }

  const baseName = pathLib.basename(fullPath);
  if (
    forbiddenNames.has(baseName) ||
    forbiddenNames.has(baseName.toUpperCase())
  ) {
    throw new Error(`forbidden name:${baseName}`);
  }

  if (fullPath.includes("..")) {
    throw new Error(`path contains ..`);
  }

  if (!fullPath.startsWith(basePath)) {
    throw new Error(
      `Invalid path: ${fullPath} is outside the base path ${basePath}`
    );
  }
};

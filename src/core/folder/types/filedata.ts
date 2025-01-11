import type { writeFile } from "node:fs/promises";

export type FileDataType = Parameters<typeof writeFile>[1];

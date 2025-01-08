import { resolve } from "path";

export const resolvePath = (base: string, child: string) => {
  const path = resolve(base, child);
  if (path.startsWith(base)) {
    return path;
  }
  throw new Error(`bad child path:${child}`);
};

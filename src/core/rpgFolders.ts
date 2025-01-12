import { createFolderTable } from "./folder/utils2";
import type { Libs } from "./folder/types";

export const createImgFolder = (libs: Libs, basePath: string) => {
  return createFolderTable(
    libs,
    libs.path.resolve(basePath, "img"),
    {
      ext: ".png",
      makeDefault: () => {
        throw new Error("Method not implemented.");
      },
      toFileData: () => {
        throw new Error("Method not implemented.");
      },
      readFile: async () => ({}),
    },
    ["faces", "pictures", "enemies"] as const
  );
};

export const createAudioFolder = (libs: Libs, basePath: string) => {
  return createFolderTable(
    libs,
    libs.path.resolve(basePath, "audio"),
    {
      ext: ".ogg",
      makeDefault: () => {
        throw new Error("Method not implemented.");
      },
      toFileData: () => {
        throw new Error("Method not implemented.");
      },
      readFile: async () => ({}),
    },
    ["bgm", "bgs", "me", "se"] as const
  );
};

// export const createEffectFolder = (libs: Libs, basePath: string) => {
//     return new FileFolder()
// }

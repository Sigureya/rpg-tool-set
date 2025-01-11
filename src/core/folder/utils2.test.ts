import { describe, it, expect, vi, beforeEach } from "vitest";
import { xxx } from "./utils2";
import path from "node:path";
import { createMockFsLib } from "./mockTypes";
import { FileFolder } from "./folderClass";

describe("xxx function", () => {
  const folderNames = ["faces", "pictures", "enemies"] as const;
  let folders: Record<(typeof folderNames)[number], any>;

  beforeEach(() => {
    folders = xxx(
      { path, fileSystem: createMockFsLib() },
      "/base/",
      {
        ext: ".png",
        makeDefault: vi.fn(),
        toFileData: vi.fn(),
        readFile: vi.fn(),
      },
      folderNames
    );
  });

  it("should create folders with correct keys", () => {
    folderNames.forEach((name) => {
      expect(folders).toHaveProperty(name);
    });
  });

  it("should create instances of FileFolder", () => {
    folderNames.forEach((name) => {
      expect(folders[name]).toBeInstanceOf(FileFolder);
    });
  });

  //   it("should pass correct arguments to FileFolder constructor", () => {
  //     folderNames.forEach((name) => {
  //       const folder = folders[name];
  //       //      expect(folder.libs).toEqual({ path, fileSystem: createMockFsLib() });
  //       //      expect(folder.basePath).toBe("/base/");
  //       expect(folder.traits.ext).toBe(".png");
  //     });
  //   });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileFoldersManager } from "./fileFoldertManager";
import type { FolderTraits, Libs } from "./types";
import { createMockFsLib } from "./mockTypes";

describe("FileFoldersManager", () => {
  const mockLibs: Libs = {
    path: {
      resolve: vi.fn(),
      basename: vi.fn(),
    },
    fileSystem: createMockFsLib(),
  };

  const folderA: FolderTraits<string> = {
    ext: ".json",
    makeDefault: () => Buffer.from("{}"),
    readFile: async (file) => JSON.parse(file.toString()),
    toFileData: (data) => Buffer.from(JSON.stringify(data)),
  };
  const folderB: FolderTraits<string> = {
    ext: ".txt",
    makeDefault: () => Buffer.from("default text"),
    readFile: async (file) => file.toString(),
    toFileData: (data) => Buffer.from(data),
  };

  const folderTraits = {
    folderA,
    folderB,
  };

  const basePath = "/base/path";
  let manager: FileFoldersManager<typeof folderTraits>;

  beforeEach(() => {
    manager = new FileFoldersManager(mockLibs, basePath, folderTraits);
    vi.resetAllMocks();
  });

  //   it("should resolve base path", () => {
  //     mockLibs.path.resolve.mockImplementation((path) => path);
  //     expect(manager.base).toBe(basePath);
  //   });

  it("should initialize children folders", () => {
    const manager = new FileFoldersManager(mockLibs, basePath, folderTraits);
    expect(manager.children.folderA).toBeDefined();
    expect(manager.children.folderB).toBeDefined();
  });

  it("should call mkDir on all child folders", async () => {
    const mockMkDirA = vi
      .spyOn(manager.children.folderA, "mkDir")
      .mockResolvedValue();
    const mockMkDirB = vi
      .spyOn(manager.children.folderB, "mkDir")
      .mockResolvedValue();

    await manager.mkDir();

    expect(mockMkDirA).toHaveBeenCalled();
    expect(mockMkDirB).toHaveBeenCalled();
  });
});

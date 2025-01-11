import { describe, it, expect, vi, beforeEach } from "vitest";
import { createFolderTable } from "./utils2";
import path from "node:path";
import { createMockFsLib } from "./mockTypes";
import { FileFolder } from "./folderClass";

describe("createFolderTable", () => {
  const folderNames = ["faces", "pictures", "enemies"] as const;
  let folders: Record<(typeof folderNames)[number], FileFolder<unknown>>;

  beforeEach(() => {
    folders = createFolderTable(
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

  it("should set the correct extension for each folder", () => {
    [folders.enemies, folders.faces, folders.pictures].forEach((folder) => {
      expect(folder.ext).toBe(".png");
    });
  });

  it("should create instances of FileFolder", () => {
    folderNames.forEach((name) => {
      expect(folders[name]).toBeInstanceOf(FileFolder);
    });
  });

  it("should pass correct arguments to FileFolder constructor", () => {
    folderNames.forEach((name) => {
      const folder = folders[name];
      expect(folder.ext).toBe(".png");
    });
  });
});

describe("createFolderTable with invalid folder names", () => {
  const invalidFolderNames = ["..", "/", "\\"] as const;

  invalidFolderNames.forEach((name) => {
    it(`should throw an error for invalid folder names:(${name})`, () => {
      expect(() => {
        createFolderTable(
          { path, fileSystem: createMockFsLib() },
          "/base/",
          {
            ext: ".png",
            makeDefault: vi.fn(),
            toFileData: vi.fn(),
            readFile: vi.fn(),
          },
          [name]
        );
      }).toThrow();
    });
  });
});

describe("createFolderTable with empty folder names array", () => {
  it("should handle empty folder names array", () => {
    const emptyFolders = createFolderTable(
      { path, fileSystem: createMockFsLib() },
      "/base/",
      {
        ext: ".png",
        makeDefault: vi.fn(),
        toFileData: vi.fn(),
        readFile: vi.fn(),
      },
      []
    );
    expect(Object.keys(emptyFolders)).toHaveLength(0);
  });
});

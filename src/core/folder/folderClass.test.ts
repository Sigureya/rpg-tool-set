import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileFolder } from "./folderClass";
import type { FolderTraits } from "./types";
import { resolve } from "path";
import * as pathLib from "path";

describe("FileFolder", () => {
  const mockFileSystem = {
    mkdir: vi.fn(),
    readFile: vi.fn(),
    writeFile: vi.fn(),
    readdir: vi.fn(),
    access: vi.fn(),
  };

  const mockFolderTraits: FolderTraits<string> = {
    ext: ".txt",
    makeDefault: () => Buffer.from(""),
    readFile: async (file) => file.toString(),
    toFileData: (data) => Buffer.from(data),
  };

  const basePath = resolve("/base/path");
  let fileFolder: FileFolder<string>;

  beforeEach(() => {
    fileFolder = new FileFolder(
      {
        fileSystem: mockFileSystem,
        path: pathLib,
      },

      basePath,
      mockFolderTraits
    );
    vi.resetAllMocks();
  });

  it("should resolve a valid path", () => {
    //    mockPathLib.resolve.mockImplementation((...paths) => paths.join("/"));
    const resolvedPath = fileFolder.resolvePath("child/file.txt");
    // expect(mockPathLib.resolve).toHaveBeenCalledWith(
    //   fileFolder.basePath,
    //   "child/file.txt"
    // );
    expect(resolvedPath).toBe(pathLib.resolve("/base/path/child/file.txt"));
  });

  it("should throw error for invalid path", () => {
    expect(() => fileFolder.resolvePath("../invalid")).toThrowError();
    expect(() => fileFolder.resolvePath("prn")).toThrowError();
    expect(() => fileFolder.resolvePath("pRn")).toThrowError();
  });

  it("should call mkdir with recursive flag", async () => {
    await fileFolder.mkDir();
    expect(mockFileSystem.mkdir).toHaveBeenCalledWith(basePath, {
      recursive: true,
    });
  });

  it("should read a file and return parsed content", async () => {
    const path = fileFolder.resolveFilenamePath("file");
    mockFileSystem.readFile.mockResolvedValue(Buffer.from("file content"));
    const content = await fileFolder.read("file");
    expect(mockFileSystem.readFile).toHaveBeenCalledWith(path);
    expect(content).toBe("file content");
  });

  it("should write data to a file", async () => {
    const path = fileFolder.resolveFilenamePath("file");
    const data = "new data";
    await fileFolder.write("file", data);
    expect(mockFileSystem.writeFile).toHaveBeenCalledWith(
      path,
      Buffer.from(data)
    );
  });
});

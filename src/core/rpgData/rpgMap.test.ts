import { describe, it, expect, vi } from "vitest";
import type { MapFilePromise, MapFileData } from "./rpgMap";
import { resolveMapFile } from "./rpgMap";
import type { Data_Map } from "@sigureya/rpgtypes";

describe("resolveMapFile", () => {
  it("should resolve the data property of MapFilePromise", async () => {
    const mockData: Data_Map = {
      /* mock data properties */
    };
    const mapFilePromise: MapFilePromise = {
      filename: "Map001",
      editingName: "Test Map",
      id: 1,
      data: Promise.resolve(mockData),
    };

    const result: MapFileData = await resolveMapFile(mapFilePromise);

    expect(result).toEqual({
      filename: "Map001",
      editingName: "Test Map",
      id: 1,
      data: mockData,
    });
  });

  it("should handle rejected promises", async () => {
    const mapFilePromise: MapFilePromise = {
      filename: "Map002",
      editingName: "Test Map 2",
      id: 2,
      data: Promise.reject(new Error("Failed to load data")),
    };

    await expect(resolveMapFile(mapFilePromise)).rejects.toThrow(
      "Failed to load data"
    );
  });
});

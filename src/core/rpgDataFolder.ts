import type { Libs } from "./folder";
import { FileFolder, type FileFolderInterFace } from "./folder";
import type { DataTypesTable, IdentifiedItems } from "@sigureya/rpgtypes";
import { filterValidData } from "./utilst";
import type { MapFileInfo } from "./rpgData/rpgMap";

export class RpgDataFolder extends FileFolder<string> {
  constructor(libs: Libs, basePath: string) {
    super(libs, basePath, {
      ext: ".json",
      readFile: async (data) => data.toString("utf-8"),
      toFileData: (data) => Buffer.from(JSON.stringify(data)),
      makeDefault: (filename) => {
        // TODO:ファイル名に応じて良い感じに処理を行う
        throw new Error("Method not implemented.");
      },
    });
  }

  write(filename: string, data: unknown): Promise<void> {
    const safeFileName = this.safeFilename(filename);
    if (!safeFileName) {
      throw new Error("Invalid filename");
    }

    throw new Error("Method not implemented.");
  }
  async readJSON<FileName extends keyof DataTypesTable>(
    filename: FileName
  ): Promise<DataTypesTable[FileName][]> {
    const text = await this.read(filename);

    return [];
  }
  writeJSON<FileName extends keyof DataTypesTable>(
    data: DataTypesTable[FileName],
    filename: FileName
  ) {}

  safeFilename(filename: string): keyof DataTypesTable | undefined {
    return this.filenames().find((name) => name === filename);
  }
  filenames(): (keyof DataTypesTable)[] {
    return [
      "Actors",
      "Classes",
      "Skills",
      "Items",
      "Weapons",
      "Armors",
      "Enemies",
      "Troops",
      "States",
      "Animations",
      "CommonEvents",
      "MapInfos",
    ] as const;
  }
  readMapData(mapId: number): Promise<MapFileInfo> {
    throw new Error("Method not implemented.");
  }
}

import type { Data_Map, DataTypesTable } from "@sigureya/rpgtypes";
import type { Libs } from "./folder";
import { FileFolder } from "./folder";
import type {
  MapFileData,
  MapDataFolderInterface,
  RpgMainDataFolderInterface,
} from "./rpgData";
import { createMapFileName, validateMapData } from "./rpgData";

export class RpgDataFolder
  extends FileFolder<string>
  implements MapDataFolderInterface, RpgMainDataFolderInterface
{
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

  async readAllMapDataMZ(): Promise<Promise<MapFileData>[]> {
    const infoList = await this.readJSON("MapInfos");
    return infoList.map<Promise<MapFileData>>(async (info) => {
      const mapFileName = createMapFileName(info.id);
      const data = await this.readMapData(mapFileName);
      return {
        data,
        id: info.id,
        editingName: info.name,
        filename: mapFileName,
      };
    });
  }
  readMapDataFromId(id: number): Promise<Data_Map> {
    return this.readMapData(createMapFileName(id));
  }

  async readMapData(filename: string): Promise<Data_Map> {
    const dataText = await this.read(filename);
    const data: Data_Map = JSON.parse(dataText);
    if (!validateMapData(data)) {
      throw new Error("Invalid map data");
    }
    return data;
  }
}

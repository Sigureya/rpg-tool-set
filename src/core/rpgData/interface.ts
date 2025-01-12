import type { Data_Map, Data_System } from "@sigureya/rpgtypes";
import type { MapFileData } from "./rpgMap";
import type { DataTypesTable } from "@sigureya/rpgtypes";

export interface MapDataFolderInterface {
  readMapData(filename: string): Promise<Data_Map>;
  readAllMapDataMZ(): Promise<Promise<MapFileData>[]>;
}

export interface RpgMainDataFolderInterface {
  readJSON<FileName extends keyof DataTypesTable>(
    filename: FileName
  ): Promise<DataTypesTable[FileName][]>;
}
export interface RpgSystemDataFolder {
  readSystemData(): Promise<Data_System>;
}

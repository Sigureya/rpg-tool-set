import type { Data_Map } from "@sigureya/rpgtypes";
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

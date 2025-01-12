import type { Data_Map } from "@sigureya/rpgtypes";
import type { MapFileData } from "./rpgMap";

export interface MapDataFolderInterface {
  readMapData(filename: string): Promise<Data_Map>;
  readAllMapDataMZ(): Promise<Promise<MapFileData>[]>;
}

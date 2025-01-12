import type { Data_Map } from "@sigureya/rpgtypes";

export type MapFileName = `Map${string}`;

export interface MapFileInfo {
  filename: MapFileName;
  editingName: string;
  id: number;
}

export interface MapFilePromise {
  data: Promise<Data_Map>;
  filename: MapFileName;
  editingName: string;
  id: number;
}

export interface MapFileData extends MapFileInfo {
  data: Data_Map;
  filename: MapFileName;
  editingName: string;
  id: number;
}

export const resolveMapFile = async (
  map: MapFilePromise
): Promise<MapFileData> => ({
  filename: map.filename,
  editingName: map.editingName,
  id: map.id,
  data: await map.data,
});

export const createMapFileName = (mapId: number): MapFileName => {
  return `Map${mapId.toString().padStart(3, "0")}` as const;
};

export const isMapFileName = (filename: string): filename is MapFileName => {
  return /^Map\d{3}$/.test(filename);
};

export const validateMapData = (map: Data_Map) => true;

export const createMapFileInfo = (
  mapId: number,
  editingName = ""
): MapFileInfo => {
  return {
    filename: createMapFileName(mapId),
    editingName,
    id: mapId,
  };
};

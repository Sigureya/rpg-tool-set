import type { Data_Map } from "@sigureya/rpgtypes";

export type MapFileName = `Map${string}`;

export interface MapFileInfo {
  data: Data_Map;
  filename: MapFileName;
  editingName: string;
  id: number;
}
export const createMapFileName = (mapId: number): MapFileName => {
  return `Map${mapId.toString().padStart(3, "0")}` as const;
};

export const isMapFileName = (filename: string): filename is MapFileName => {
  return /^Map\d{3}$/.test(filename);
};

export const createMapFileInfo = (
  mapId: number,
  data: Data_Map
): MapFileInfo => {
  return {
    data,
    filename: createMapFileName(mapId),
    editingName: data.displayName,
    id: mapId,
  };
};

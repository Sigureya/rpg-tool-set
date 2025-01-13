import type { MapDataConverter } from "./converter";
import type { MapDataFolderInterface } from "./interface";

export const convertMapData = async <T>(
  folder: MapDataFolderInterface,
  converter: MapDataConverter<T>
): Promise<Promise<T>[]> => {
  const infos = await folder.readAllMapDataMZ();
  return infos.map(async (promise) => converter.convertMap(await promise));
};

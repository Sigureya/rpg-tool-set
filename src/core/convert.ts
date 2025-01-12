import type { DataTypesTable } from "@sigureya/rpgtypes";
import type {
  EventCommandConverter,
  MapDataConverter,
  MapDataFolderInterface,
} from "./rpgData";
import type { RpgDataFolder } from "./rpgDataFolder";

const execConvert = async <T, Key extends keyof DataTypesTable>(
  folder: RpgDataFolder,
  fiilename: Key,
  converter: (data: DataTypesTable[Key]) => T
) => {
  const list = await folder.readJSON(fiilename);
  return list.map(converter);
};

export const convertEventData = async <T>(
  folder: RpgDataFolder,
  converter: EventCommandConverter<T>
) => {
  return {
    commonEvents: await execConvert(folder, "CommonEvents", (data) =>
      converter.commonEvent(data)
    ),
    troop: await execConvert(folder, "Troops", (data) => converter.troop(data)),
  };
};

export const convertMapData = async <T>(
  folder: MapDataFolderInterface,
  converter: MapDataConverter<T>
) => {
  const infos = await folder.readAllMapDataMZ();
  // ここでPromise.all()してないのは意図的
  // 例えば複数のマップファイルを並行して変換するのなら、同期しない方が速い
  return infos.map(async (promise) => converter.convertMap(await promise));
};

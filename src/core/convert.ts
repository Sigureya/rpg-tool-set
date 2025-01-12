import type { DataTypesTable } from "@sigureya/rpgtypes";
import type {
  EventCommandConverter,
  MainDataConverter,
  MapDataConverter,
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

const convertMapData = async <T>(
  folder: RpgDataFolder,
  converter: MapDataConverter<T>
) => {
  const infos = await folder.readJSON("MapInfos");
  infos.map((info) => {});
};

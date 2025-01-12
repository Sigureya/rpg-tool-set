import type { DataTypesTable } from "@sigureya/rpgtypes";
import type {
  ActorConverter,
  ArmorConverter,
  EnemyConverter,
  EventCommandConverter,
  MapDataConverter,
  MapDataFolderInterface,
  ClassConverter,
  CommonEventConverter,
  ItemConverter,
  SkillConverter,
  StateConverter,
  WeaponConverter,
  SystemDataConveter,
  RpgMainDataFolderInterface,
} from "./rpgData";
import type { RpgDataFolder } from "./rpgDataFolder";

export const execConvert = async <T, Key extends keyof DataTypesTable>(
  folder: RpgMainDataFolderInterface,
  fiilename: Key,
  converter: (data: DataTypesTable[Key]) => T
) => {
  const list = await folder.readJSON(fiilename);
  return list.map(converter);
};

export const convertActor = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ActorConverter<T>
) => {
  return execConvert(folder, "Actors", (data) => converter.convertActor(data));
};
export const convertArmor = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ArmorConverter<T>
) => {
  return execConvert(folder, "Armors", (data) => converter.convertArmor(data));
};
export const convertCommonEvent = async <T>(
  folder: RpgDataFolder,
  converter: CommonEventConverter<T>
) => {
  return execConvert(folder, "CommonEvents", (data) =>
    converter.convertCommonEvent(data)
  );
};

export const convertSystem = async <T>(
  folder: RpgDataFolder,
  converter: SystemDataConveter<T>
) => {
  //  const system  = folder.
  // return execConvert(folder, "System", (data) => converter.convertSystem(data));
};

export const convertWeapon = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: WeaponConverter<T>
) => {
  return execConvert(folder, "Weapons", (data) =>
    converter.convertWeapon(data)
  );
};

export const convertClass = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ClassConverter<T>
) => {
  return execConvert(folder, "Classes", (data) => converter.convertClase(data));
};

export const convertState = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: StateConverter<T>
) => {
  return execConvert(folder, "States", (data) => converter.convertState(data));
};

export const convertSkill = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: SkillConverter<T>
) => {
  return execConvert(folder, "Skills", (data) => converter.convertSkill(data));
};

export const convertEnemy = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: EnemyConverter<T>
) => {
  return execConvert(folder, "Enemies", (data) => converter.convertEnemy(data));
};

export const convertItem = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ItemConverter<T>
) => {
  return execConvert(folder, "Items", (data) => converter.convertItem(data));
};

export const convertEventData = async <T>(
  folder: RpgDataFolder,
  converter: EventCommandConverter<T>
) => {
  return {
    commonEvents: await execConvert(folder, "CommonEvents", (data) =>
      converter.convertCommonEvent(data)
    ),
    troops: await execConvert(folder, "Troops", (data) =>
      converter.convertTroop(data)
    ),
    maps: (await Promise.all(await convertMapData(folder, converter))) as T[],
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

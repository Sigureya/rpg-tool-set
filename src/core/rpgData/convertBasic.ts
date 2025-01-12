import type { DataTypesTable } from "@sigureya/rpgtypes";
import type {
  ActorConverter,
  ArmorConverter,
  EnemyConverter,
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
  RpgSystemDataFolder,
  TroopConverter,
} from ".";

export const convertSystem = async <T>(
  folder: RpgSystemDataFolder,
  converter: SystemDataConveter<T>
) => {
  return converter.convertSystem(await folder.readSystemData(), "System");
};

export const execConvert = async <T, Key extends keyof DataTypesTable>(
  folder: RpgMainDataFolderInterface,
  fiilename: Key,
  converter: (data: DataTypesTable[Key], filename: string) => T
) => {
  const list = await folder.readJSON(fiilename);
  return list.map((data) => converter(data, fiilename));
};

export const convertActor = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ActorConverter<T>
) => {
  return execConvert(folder, "Actors", (data, fiilename) =>
    converter.convertActor(data, fiilename)
  );
};
export const convertArmor = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ArmorConverter<T>
) => {
  return execConvert(folder, "Armors", (data, fiilename) =>
    converter.convertArmor(data, fiilename)
  );
};
export const convertCommonEvent = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: CommonEventConverter<T>
) => {
  return execConvert(folder, "CommonEvents", (data, filename) =>
    converter.convertCommonEvent(data, filename)
  );
};

export const convertWeapon = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: WeaponConverter<T>
) => {
  return execConvert(folder, "Weapons", (data, fiilename) =>
    converter.convertWeapon(data, fiilename)
  );
};

export const convertClass = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ClassConverter<T>
) => {
  return execConvert(folder, "Classes", (data, fiilename) =>
    converter.convertClase(data, fiilename)
  );
};

export const convertState = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: StateConverter<T>
) => {
  return execConvert(folder, "States", (data, filename) =>
    converter.convertState(data, filename)
  );
};

export const convertSkill = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: SkillConverter<T>
) => {
  return execConvert(folder, "Skills", (data, filename) =>
    converter.convertSkill(data, filename)
  );
};

export const convertEnemy = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: EnemyConverter<T>
) => {
  return execConvert(folder, "Enemies", (data, filename) =>
    converter.convertEnemy(data, filename)
  );
};

export const convertItem = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ItemConverter<T>
) => {
  return execConvert(folder, "Items", (data, filename) =>
    converter.convertItem(data, filename)
  );
};

export const convertTroop = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: TroopConverter<T>
) => {
  return execConvert(folder, "Troops", (data, filename) =>
    converter.convertTroop(data, filename)
  );
};

export const convertMapData = async <T>(
  folder: MapDataFolderInterface,
  converter: MapDataConverter<T>
): Promise<Promise<T>[]> => {
  const infos = await folder.readAllMapDataMZ();
  return infos.map(async (promise) => converter.convertMap(await promise));
};

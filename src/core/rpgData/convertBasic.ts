import type { DataTypesTable } from "@sigureya/rpgtypes";
import type {
  ActorConverter,
  ArmorConverter,
  EnemyConverter,
  ClassConverter,
  CommonEventConverter,
  ItemConverter,
  SkillConverter,
  StateConverter,
  WeaponConverter,
  SystemDataConveter,
  TroopConverter,
} from "./converter";
import type {
  RpgSystemDataFolder,
  RpgMainDataFolderInterface,
} from "./interface";

// TODO:変換処理でエラーがあった場合の対応
// 戻り値を調整して、T=>T2ではなくT[]=>T2[]にして、エラーがあったオブジェクトを全て列挙できるシステムにする

export const convertSystem = async <T>(
  folder: RpgSystemDataFolder,
  converter: SystemDataConveter<T>
): Promise<T> => {
  return converter.convertSystem(await folder.readSystemData(), "System");
};

export const execConvert = async <T, Key extends keyof DataTypesTable>(
  folder: RpgMainDataFolderInterface,
  fiilename: Key,
  converter: (data: Array<DataTypesTable[Key]>, filename: string) => T[]
): Promise<T[]> => {
  const list = await folder.readJSON(fiilename);
  return converter(list, fiilename);
};

export const convertActor = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ActorConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "Actors", (data, fiilename) =>
    converter.convertActor(data, fiilename)
  );
};
export const convertArmor = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ArmorConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "Armors", (data, fiilename) =>
    converter.convertArmor(data, fiilename)
  );
};
export const convertCommonEvent = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: CommonEventConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "CommonEvents", (data, filename) =>
    converter.convertCommonEvent(data, filename)
  );
};

export const convertWeapon = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: WeaponConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "Weapons", (data, fiilename) =>
    converter.convertWeapon(data, fiilename)
  );
};

export const convertClass = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ClassConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "Classes", (data, fiilename) =>
    converter.convertClase(data, fiilename)
  );
};

export const convertState = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: StateConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "States", (data, filename) =>
    converter.convertState(data, filename)
  );
};

export const convertSkill = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: SkillConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "Skills", (data, filename) =>
    converter.convertSkill(data, filename)
  );
};

export const convertEnemy = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: EnemyConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "Enemies", (data, filename) =>
    converter.convertEnemy(data, filename)
  );
};

export const convertItem = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ItemConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "Items", (data, filename) =>
    converter.convertItem(data, filename)
  );
};

export const convertTroop = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: TroopConverter<T>
): Promise<T[]> => {
  return execConvert(folder, "Troops", (data, filename) =>
    converter.convertTroop(data, filename)
  );
};

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
} from "./rpgData";
import type { RpgDataFolder } from "./rpgDataFolder";
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
  folder: RpgDataFolder,
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

export const convertMapData = async <T>(
  folder: MapDataFolderInterface,
  converter: MapDataConverter<T>
) => {
  const infos = await folder.readAllMapDataMZ();
  // ここでPromise.all()してないのは意図的
  // 例えば複数のマップファイルを並行して変換するのなら、同期しない方が速い
  return infos.map(async (promise) => converter.convertMap(await promise));
};

export const convertMainData = async <
  Actor,
  Armor,
  Class,
  Enemy,
  Item,
  Skill,
  State,
  Weapon
>(
  folder: RpgMainDataFolderInterface,
  converter: ActorConverter<Actor> &
    ArmorConverter<Armor> &
    ClassConverter<Class> &
    EnemyConverter<Enemy> &
    ItemConverter<Item> &
    SkillConverter<Skill> &
    StateConverter<State> &
    WeaponConverter<Weapon>
) => {
  return {
    actors: await convertActor(folder, converter),
    armors: await convertArmor(folder, converter),
    classes: await convertClass(folder, converter),
    enemies: await convertEnemy(folder, converter),
    items: await convertItem(folder, converter),
    skills: await convertSkill(folder, converter),
    states: await convertState(folder, converter),
    weapons: await convertWeapon(folder, converter),
  };
};

export const convertEventData = async <Troop, Common, Map>(
  folder: RpgMainDataFolderInterface & MapDataFolderInterface,
  converter: CommonEventConverter<Common> &
    TroopConverter<Troop> &
    MapDataConverter<Map>
): Promise<{ commonEvents: Common[]; troops: Troop[]; maps: Map[] }> => {
  return {
    maps: (await Promise.all(await convertMapData(folder, converter))) as Map[],
    commonEvents: await execConvert(folder, "CommonEvents", (data, fiilename) =>
      converter.convertCommonEvent(data, fiilename)
    ),
    troops: await execConvert(folder, "Troops", (data, fiilename) =>
      converter.convertTroop(data, fiilename)
    ),
  };
};

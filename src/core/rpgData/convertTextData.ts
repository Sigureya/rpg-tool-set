import type {
  ActorConverter,
  ArmorConverter,
  ClassConverter,
  EnemyConverter,
  ItemConverter,
  SkillConverter,
  StateConverter,
  WeaponConverter,
  CommonEventConverter,
  TroopConverter,
  MapDataConverter,
} from "./converter";
import { convertEventData } from "./convertEventData";
import { convertMainData } from "./convertMainData";
import type {
  RpgMainDataFolderInterface,
  MapDataFolderInterface,
} from "./interface";

export const convertTextData = <
  Actor,
  Armor,
  Class,
  Enemy,
  Item,
  Skill,
  State,
  Weapon,
  Troop,
  Common,
  Map
>(
  folder: RpgMainDataFolderInterface & MapDataFolderInterface,
  converter: ActorConverter<Actor> &
    ArmorConverter<Armor> &
    ClassConverter<Class> &
    EnemyConverter<Enemy> &
    ItemConverter<Item> &
    SkillConverter<Skill> &
    StateConverter<State> &
    WeaponConverter<Weapon> &
    CommonEventConverter<Common> &
    TroopConverter<Troop> &
    MapDataConverter<Map>
) => {
  return {
    // TODO:要素の上書きが生じないことを証明するテストコードが必要
    ...convertMainData(folder, converter),
    ...convertEventData(folder, converter),
  };
};

import type {
  Data_Actor,
  Data_Armor,
  Data_Class,
  Data_CommonEvent,
  Data_Enemy,
  Data_Item,
  Data_Map,
  Data_Skill,
  Data_State,
  Data_System,
  Data_Troop,
  Data_Weapon,
} from "@sigureya/rpgtypes";
import type { MapFileData } from "./rpgMap";

export interface ActorConverter<T = Data_Actor> {
  convertActor(actors: Data_Actor, filename: string): T;
}
export interface ArmorConverter<T = Data_Armor> {
  convertArmor(armors: Data_Armor, filename: string): T;
}
export interface ClassConverter<T = Data_Class> {
  convertClass(clase_: Data_Class, filename: string): T;
}
export interface EnemyConverter<T = Data_Enemy> {
  convertEnemy(enemy: Data_Enemy, filename: string): T;
}
export interface ItemConverter<T = Data_Item> {
  convertItem(item: Data_Item, filename: string): T;
}
export interface SkillConverter<T = Data_Skill> {
  convertSkill(skill: Data_Skill, filename: string): T;
}
export interface StateConverter<T = Data_State> {
  convertState(state: Data_State, filename: string): T;
}
export interface WeaponConverter<T = Data_Weapon> {
  convertWeapon(weapon: Data_Weapon, filename: string): T;
}

export interface SystemDataConveter<T = Data_System> {
  convertSystem(system: Data_System, filename: string): T;
}
export interface MapDataConverter<T = Data_Map> {
  convertMap(map: MapFileData): T;
}
export interface TroopConverter<T = Data_Troop> {
  convertTroop(map: Data_Troop, filename: string): T;
}

export interface CommonEventConverter<T = Data_CommonEvent> {
  convertCommonEvent(event: Data_CommonEvent, filename: string): T;
}

export interface MainDataConverter<T>
  extends ActorConverter<T>,
    ArmorConverter<T>,
    ClassConverter<T>,
    EnemyConverter<T>,
    ItemConverter<T>,
    SkillConverter<T>,
    StateConverter<T>,
    WeaponConverter<T> {}

export interface ImageDataConverterMZ<T>
  extends EnemyConverter<T>,
    ActorConverter<T>,
    CommonEventConverter<T> {}

export interface EventCommandConverter<T>
  extends MapDataConverter<T>,
    TroopConverter<T>,
    CommonEventConverter<T> {}

// export interface TextDataConveter<T>
//   extends EventCommandConverter<T>,
//     MainDataConverter,
//     SystemDataConveter<T> {}

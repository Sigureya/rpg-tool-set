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
import type { MapFileInfo } from "./rpgMap";

export interface ActorConverter<T = Data_Actor> {
  convertActor(actor: Data_Actor): T;
}
export interface ArmorConverter<T = Data_Armor> {
  convertArmor(armor: Data_Armor): T;
}
export interface ClassConverter<T = Data_Class> {
  convertClase_(clase_: Data_Class): T;
}
export interface EnemyConverter<T = Data_Enemy> {
  convertEnemy(enemy: Data_Enemy): T;
}
export interface ItemConverter<T = Data_Item> {
  convertItem(item: Data_Item): T;
}
export interface SkillConverter<T = Data_Skill> {
  convertSkill(skill: Data_Skill): T;
}
export interface StateConverter<T = Data_State> {
  convertState(state: Data_State): T;
}
export interface WeaponConverter<T = Data_Weapon> {
  convertWeapon(weapon: Data_Weapon): T;
}

export interface SystemDataConveter<T = Data_System> {
  convertSystem(system: Data_System): T;
}
export interface MapDataConverter<T = Data_Map> {
  convertMap(map: MapFileInfo): T;
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

export interface EventCommandConverter<T> {
  troop(troop: Data_Troop): T;
  mapData(mapData: MapFileInfo): T;
  commonEvent(commmon: Data_CommonEvent): T;
}

export interface TextDataConveter<T>
  extends EventCommandConverter<T>,
    MainDataConverter<T>,
    SystemDataConveter<T> {}

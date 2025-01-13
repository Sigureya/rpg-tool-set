import {
  convertActor,
  convertArmor,
  convertClass,
  convertEnemy,
  convertItem,
  convertSkill,
  convertState,
  convertWeapon,
} from "./convertBasic";
import type {
  ActorConverter,
  ArmorConverter,
  ClassConverter,
  EnemyConverter,
  ItemConverter,
  SkillConverter,
  StateConverter,
  WeaponConverter,
} from "./converter";
import type { RpgMainDataFolderInterface } from "./interface";

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

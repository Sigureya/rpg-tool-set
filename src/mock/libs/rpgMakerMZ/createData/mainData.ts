import type {
  Data_Actor,
  Data_Enemy,
  Data_Weapon,
  Data_Armor,
  Data_Class,
  Data_Skill,
  Data_Item,
  Data_State,
  ParamArray,
} from "@sigureya/rpgtypes";

export const createParamArray = (): ParamArray => [0, 0, 0, 0, 0, 0, 0, 0];

export const createActor = (proto?: Partial<Data_Actor>): Data_Actor => {
  return {
    id: 0,
    name: "",
    nickname: "",
    profile: "",
    note: "",
    classId: 0,
    initialLevel: 1,
    maxLevel: 99,
    characterIndex: 0,
    characterName: "",
    faceIndex: 0,
    faceName: "",
    battlerName: "",
    traits: [],
    equips: [],
    ...proto,
  };
};

export const createEnemy = (proto?: Partial<Data_Enemy>): Data_Enemy => {
  return {
    battlerHue: 0,
    id: 0,
    name: "",
    note: "",
    battlerName: "",
    traits: [],
    params: createParamArray(),
    exp: 0,
    gold: 0,
    dropItems: [],
    actions: [],

    ...proto,
  };
};

export const createArmor = (proto?: Partial<Data_Armor>): Data_Armor => {
  return {
    price: 0,
    id: 0,
    name: "",
    note: "",
    //    iconIndex: 0,
    description: "",
    //    etypeId: 0,
    params: createParamArray(),
    traits: [],

    ...proto,
  };
};
export const createWeapon = (proto?: Partial<Data_Weapon>): Data_Weapon => {
  return {
    price: 0,
    id: 0,
    name: "",
    note: "",
    //    iconIndex: 0,
    description: "",
    //    etypeId: 0,
    params: createParamArray(),
    traits: [],

    ...proto,
  };
};

export const createClass = (proto?: Partial<Data_Class>): Data_Class => {
  return {
    id: 0,
    expParams: [],
    learnings: [],
    name: "",
    note: "",
    traits: [],
    params: createParamArray(),
  };
};

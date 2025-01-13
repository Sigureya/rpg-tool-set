import type { Data_System } from "@sigureya/rpgtypes";
import type { System_Vehicle } from "@sigureya/rpgtypes/src/schema/data/types/system/vehicles";
import { createAudio } from "./createAudio";

// proto?: Partial<Data_System>

export const createSystemData = () => {
  return {
    local: "",
    gameTitle: "",
    currencyUnit: "",
    title1Name: "",
    terms: createTerms(),
    title2Name: "",
    optAutosave: false,
    attackMotions: [],
    startMapId: 0,
    startX: 0,
    startY: 0,
    switches: [],
    windowTone: [0, 0, 0, 0],
    editMapId: 0,
    testTroopId: 0,
    testBattlers: [],
    versionId: 0,
    advanced: undefined,
    armorTypes: [],
    elements: [],
    variables: [],
    equipTypes: [],
    sounds: [],
    titleBgm: createAudio(),
    gameoverMe: createAudio(),
    battleBgm: createAudio(),
    defeatMe: createAudio(),
    victoryMe: createAudio(),
    battleback1Name: "",
    battleback2Name: "",
    battlerName: "",
    weaponTypes: [],
    skillTypes: [],
    optDisplayTp: false,
    optDrawTitle: false,
    optExtraExp: false,
    optFloorDeath: false,
    optFollowers: false,
    optKeyItemsNumber: false,
    optSideView: false,
    optSlipDeath: false,
    optTransparent: false,
    boat: createVehicle(),
    ship: createVehicle(),
    airship: createVehicle(),
  };
};

const createVehicle = (): System_Vehicle => {
  return {
    bgm: { name: "", pan: 0, pitch: 0, volume: 0 },
    characterIndex: 0,
    characterName: "",
    startMapId: 0,
    startX: 0,
    startY: 0,
  };
};

export const createTerms = (): Data_System["terms"] => {
  return {
    messages: createMessages(),
    commands: [],
    params: createParamNames(),
    basic: [],
  };
};

export const createParamNames = (): Data_System["terms"]["params"] => {
  return ["mhp", "mmp", "atk", "def", "mat", "mdf", "agi", "luk", "hit", "eva"];
};

export const createMessages = (): Data_System["terms"]["messages"] => {
  return {
    alwaysDash: "",
    commandRemember: "",
    touchUI: "",
    bgmVolume: "",
    bgsVolume: "",
    meVolume: "",
    seVolume: "",
    possession: "",
    expTotal: "",
    expNext: "",
    saveMessage: "",
    loadMessage: "",
    file: "",
    autosave: "",
    partyName: "",
    emerge: "",
    preemptive: "",
    surprise: "",
    escapeStart: "",
    escapeFailure: "",
    victory: "",
    defeat: "",
    obtainExp: "",
    obtainGold: "",
    obtainItem: "",
    levelUp: "",
    obtainSkill: "",
    useItem: "",
    criticalToEnemy: "",
    criticalToActor: "",
    actorDamage: "",
    actorRecovery: "",
    actorGain: "",
    actorLoss: "",
    actorDrain: "",
    actorNoDamage: "",
    actorNoHit: "",
    enemyDamage: "",
    enemyRecovery: "",
    enemyGain: "",
    enemyLoss: "",
    enemyDrain: "",
    enemyNoDamage: "",
    enemyNoHit: "",
    evasion: "",
    magicEvasion: "",
    magicReflection: "",
    counterAttack: "",
    substitute: "",
    buffAdd: "",
    debuffAdd: "",
    buffRemove: "",
    actionFailure: "",
  };
};

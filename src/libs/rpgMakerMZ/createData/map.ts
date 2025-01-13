import type { Data_Map, MapEvent } from "@sigureya/rpgtypes";
import type { MapEventPage } from "@sigureya/rpgtypes";

export const createMap = (
  proto: {
    bgm: Data_Map["bgm"];
    bgs: Data_Map["bgs"];
  } & Partial<Data_Map>
): Data_Map => ({
  autoplayBgm: true,
  autoplayBgs: false,
  battleback1Name: "",
  battleback2Name: "",
  data: [],
  disableDashing: false,
  displayName: "",
  encounterList: [],
  events: [],
  height: 0,
  note: "",
  width: 0,
  x: 0,
  y: 0,
  parallaxName: "",
  parallaxLoopX: false,
  parallaxLoopY: false,
  parallaxShow: false,
  parallaxSx: 0,
  parallaxSy: 0,
  ...proto,
});

export const createMapEvent = (arg?: Partial<MapEvent>): MapEvent => ({
  id: 0,
  name: "",
  note: "",
  x: 0,
  y: 0,
  pages: [createEventPage()],
  ...arg,
});

export const createCondtion = (
  arg?: Partial<MapEventPage["conditions"]>
): MapEventPage["conditions"] => ({
  actorId: 0,
  actorValid: false,
  itemId: 0,
  itemValid: false,
  selfSwitchCh: "",
  selfSwitchValid: false,
  switch1Id: 0,
  switch1Valid: false,
  switch2Id: 0,
  switch2Valid: false,
  variableId: 0,
  variableValid: false,
  variableValue: 0,
  ...arg,
});

export const createMapEventImage = (
  arg?: Partial<MapEventPage["image"]>
): MapEventPage["image"] => ({
  characterIndex: 0,
  characterName: "",
  direction: 6,
  pattern: 0,
  tileId: 0,
  ...arg,
});

export const createEventPage = (arg?: Partial<MapEventPage>): MapEventPage => ({
  conditions: createCondtion(),
  image: createMapEventImage(),
  moveRoute: {
    list: [],
    repeat: false,
    wait: false,
    skippable: false,
  },
  directionFix: false,
  moveFrequency: 0,
  list: [],
  ...arg,
});

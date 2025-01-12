// TODO:ここから先の複合バージョンは後で別ファイルに移動する。
// その場合、このファイルと移動先の名前を考える必要がある

import { execConvert } from "./convertBasic";
import type {
  CommonEventConverter,
  TroopConverter,
  MapDataConverter,
} from "./converter";
import { convertMapData } from "./convertMapData";
import type {
  RpgMainDataFolderInterface,
  MapDataFolderInterface,
} from "./interface";

// また複合バージョンの型引数指定が奇妙かつ複雑なので、説明が必要
export const convertEventData = async <Troop, Common, Map>(
  folder: RpgMainDataFolderInterface & MapDataFolderInterface,
  converter: CommonEventConverter<Common> &
    TroopConverter<Troop> &
    MapDataConverter<Map>
): Promise<{ commonEvents: Common[]; troops: Troop[]; maps: Map[] }> => {
  return {
    maps: (await Promise.all(await convertMapData(folder, converter))) as Map[],
    commonEvents: await execConvert(folder, "CommonEvents", (data, filename) =>
      converter.convertCommonEvent(data, filename)
    ),
    troops: await execConvert(folder, "Troops", (data, fiilename) =>
      converter.convertTroop(data, fiilename)
    ),
  };
};

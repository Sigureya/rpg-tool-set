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

export interface ConvertResult<ResultType, SrcType> {
  result: ResultType[];
  fileName: string;
  errors: ConvertError<SrcType>[];
}
interface ConvertError<T> {
  data: T;
  index: number;
  error: unknown;
}

type ConverterFunc<Data, Result> = (data: Data, fileName: string) => Result;

/**
 * @description 変換するデータ型を限定したバージョン。
 * @param list
 * @param filename
 * @param converterFunc
 * @returns
 */
export const convertRpgData = <T, Key extends keyof DataTypesTable>(
  list: ReadonlyArray<DataTypesTable[Key]>,
  filename: Key,
  converterFunc: ConverterFunc<DataTypesTable[Key], T>
): ConvertResult<T, DataTypesTable[Key]> => {
  return convertData(list, filename, converterFunc);
};

export const convertData = <Result, Data>(
  list: ReadonlyArray<Data>,
  filename: string,
  converterFunc: ConverterFunc<Data, Result>
): ConvertResult<Result, Data> => {
  const result: ConvertResult<Result, Data> = {
    result: [],
    errors: [],
    fileName: filename,
  };
  list.forEach((data, index) => {
    try {
      result.result.push(converterFunc(data, filename));
    } catch (error) {
      result.errors.push({ data, index, error });
    }
  });
  return result;
};
/**
 * @description フォルダからデータ読み込み、変換処理を呼び出す。ファイル読み込みが失敗したら例外を投げる。
 * @param folder
 * @param fileName
 * @param converterFunc
 * @returns
 */
export const convertDataFromFolder = async <
  T,
  Key extends keyof DataTypesTable
>(
  folder: RpgMainDataFolderInterface,
  fileName: Key,
  converterFunc: ConverterFunc<DataTypesTable[Key], T>
): Promise<ConvertResult<T, DataTypesTable[Key]>> => {
  const list = await folder.readJSON(fileName);
  return convertRpgData(list, fileName, converterFunc);
};

export const convertActor = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ActorConverter<T>
) => {
  return convertDataFromFolder(folder, "Actors", (data, filename) =>
    converter.convertActor(data, filename)
  );
};
export const convertArmor = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ArmorConverter<T>
) => {
  return convertDataFromFolder(folder, "Armors", (data, filename) =>
    converter.convertArmor(data, filename)
  );
};
export const convertCommonEvent = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: CommonEventConverter<T>
) => {
  return convertDataFromFolder(folder, "CommonEvents", (data, filename) =>
    converter.convertCommonEvent(data, filename)
  );
};

export const convertWeapon = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: WeaponConverter<T>
) => {
  return convertDataFromFolder(folder, "Weapons", (data, filename) =>
    converter.convertWeapon(data, filename)
  );
};

export const convertClass = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ClassConverter<T>
) => {
  return convertDataFromFolder(folder, "Classes", (data, filename) =>
    converter.convertClass(data, filename)
  );
};

export const convertState = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: StateConverter<T>
) => {
  return convertDataFromFolder(folder, "States", (data, filename) =>
    converter.convertState(data, filename)
  );
};

export const convertSkill = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: SkillConverter<T>
) => {
  return convertDataFromFolder(folder, "Skills", (data, filename) =>
    converter.convertSkill(data, filename)
  );
};

export const convertEnemy = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: EnemyConverter<T>
) => {
  return convertDataFromFolder(folder, "Enemies", (data, filename) =>
    converter.convertEnemy(data, filename)
  );
};

export const convertItem = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: ItemConverter<T>
) => {
  return convertDataFromFolder(folder, "Items", (data, filename) =>
    converter.convertItem(data, filename)
  );
};

export const convertTroop = async <T>(
  folder: RpgMainDataFolderInterface,
  converter: TroopConverter<T>
) => {
  return convertDataFromFolder(folder, "Troops", (data, filename) =>
    converter.convertTroop(data, filename)
  );
};
export const convertSystem = async <T>(
  folder: RpgSystemDataFolder,
  converter: SystemDataConveter<T>
): Promise<T> => {
  return converter.convertSystem(await folder.readSystemData(), "System");
};

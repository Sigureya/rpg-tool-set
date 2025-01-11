import { readFile } from "fs/promises";
import type { FileDataType } from "./filedata";
import { toData } from "./folderTraitJSON";
import type { FolderTraits } from "./trait";

export const vv = <T>(list: object[], func: () => T) => {
  return list.map((item) => ({
    ...func(),
    ...item,
  }));
};

interface Def<T> {
  makeItem: () => T;
}

class ArrayJSON_XXX<T, ArrayType extends T[] = T[]>
  implements FolderTraits<ArrayType>
{
  private _def: Def<T>;
  constructor(def: Def<T>) {
    this._def = def;
  }

  get ext() {
    return `.json` as const;
  }
  makeDefault() {
    return [];
  }
  async readFile(buffer: Buffer<ArrayBufferLike>): Promise<ArrayType> {
    const s = buffer.toString("utf-8");
    const json = JSON.parse(s);

    throw new Error("Method not implemented.");
  }
  toFileData(data: ArrayType) {
    return toData(data);
  }
}

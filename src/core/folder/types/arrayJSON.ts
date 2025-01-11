import { readFile } from "fs/promises";
import type { FileDataType } from "./filedata";
import type { FolderTraits } from "./trait";

export const vv = <T>(list: object[], func: () => T) => {
  return list.map<T>((item) => ({
    ...func(),
    ...item,
  }));
};

interface Def<T> {
  makeDefaultObject: () => T;
  defaultArray: () => T[];
}

export class ArrayJSONFolder<T, ArrayType extends Array<T> = Array<T>>
  implements FolderTraits<ArrayType>
{
  private _def: Def<T>;
  constructor(def: Def<T>) {
    this._def = def;
  }
  toFileData(data: ArrayType): FileDataType {
    throw new Error("Method not implemented.");
  }

  get ext() {
    return `.json` as const;
  }
  makeDefault(): FileDataType {
    return this.toFileData([] as unknown as ArrayType);
  }
  async readFile(buffer: Buffer<ArrayBufferLike>): Promise<ArrayType> {
    const s = buffer.toString("utf-8");
    const json = JSON.parse(s);

    throw new Error("Method not implemented.");
  }
}

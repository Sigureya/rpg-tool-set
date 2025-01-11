import {
  toData,
  type FileDataType,
  type FolderTraits,
  type JSONFolderTraits,
} from "./types";

export class JSONFolderTraitsClass<T> implements FolderTraits<T> {
  private _traits: JSONFolderTraits<T>;
  constructor(traits: JSONFolderTraits<T>) {
    this._traits = traits;
  }
  get ext() {
    return `.json` as const;
  }
  makeDefault(): FileDataType {
    return toData(this._traits.makeDefaultObject());
  }
  async readFile(buffer: Buffer): Promise<T> {
    return this._traits.readJSON(buffer.toString("utf-8"), buffer);
  }
  toFileData(data: T): FileDataType {
    return toData(data);
  }
}

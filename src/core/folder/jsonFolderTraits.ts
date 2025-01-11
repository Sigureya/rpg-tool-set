import type { FileDataType, FolderTraits } from "./types";

export interface JSONFolderTraits<T> {
  makeDefaultObject: () => T;
  readJSON: (jsonText: string, buffer: Buffer) => T;
}

export class JSONFolderTraitsClass<T> implements FolderTraits<T> {
  private _traits: JSONFolderTraits<T>;
  constructor(traits: JSONFolderTraits<T>) {
    this._traits = traits;
  }
  get ext() {
    return `.json` as const;
  }
  makeDefault(): FileDataType {
    return this.toFileData(this._traits.makeDefaultObject());
  }
  async readFile(buffer: Buffer): Promise<T> {
    return this._traits.readJSON(buffer.toString("utf-8"), buffer);
  }
  toFileData(data: T): FileDataType {
    const json: string = JSON.stringify(data);
    return Buffer.from(json);
  }
}

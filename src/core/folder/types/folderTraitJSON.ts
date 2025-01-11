import type { FileDataType } from "./filedata";
import type { FolderTraits } from "./trait";

export interface JSONFolderTraits<T> {
  makeDefaultObject: () => T;
  readJSON: (jsonText: string, buffer: Buffer) => T;
}

export const toData = <T>(data: T) => {
  const json: string = JSON.stringify(data);
  return Buffer.from(json);
};

export const createJSONTraits = <T>(
  traits: JSONFolderTraits<T>
): FolderTraits<T> => ({
  ext: ".json",
  makeDefault: () => {
    return toData(traits.makeDefaultObject());
  },
  readFile: async (buffer: Buffer): Promise<T> => {
    return traits.readJSON(buffer.toString("utf-8"), buffer);
  },
  toFileData: function (data: T): FileDataType {
    return toData(data);
  },
});

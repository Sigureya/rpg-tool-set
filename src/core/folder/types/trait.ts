import type { FileDataType } from "./filedata";

export interface FolderTraits<T> {
  ext: `.${string}`;
  makeDefault: () => FileDataType;
  readFile(file: Buffer<ArrayBufferLike>): Promise<T>;
  toFileData: (data: T) => FileDataType;
}

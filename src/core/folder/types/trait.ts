import type { FileDataType } from "./filedata";

export interface FolderTraits<T> {
  ext: `.${string}`;
  makeDefault: (filename: string) => FileDataType;
  readFile(buffer: Buffer<ArrayBufferLike>, filePath: string): Promise<T>;
  toFileData: (data: T) => FileDataType;
}

export interface FileFolderInterFace {
  ext: `.${string}`;
  mkDir(): Promise<void>;
  read(filename: string): Promise<unknown>;
  write(filename: string, data: unknown): Promise<void>;
}

export interface FolderTraits<T> {
  ext: `.${string}`;
  makeDefault: () => T;
  readFile(file: File): Promise<T>;
}

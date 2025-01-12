import type { FileFolderInterFace } from "./folder";
import type { AnyDataType, DataTypesTable } from "@sigureya/rpgtypes";
import { FileFolder, type Libs } from "./folder";

export class RpgDataFolder implements FileFolderInterFace {
  get ext() {
    return ".json" as const;
  }
  mkDir(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  read(filename: string): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  write(filename: string, data: unknown): Promise<void> {
    const safeFileName = this.safeFilename(filename);
    if (!safeFileName) {
      throw new Error("Invalid filename");
    }

    throw new Error("Method not implemented.");
  }
  safeFilename(filename: string): keyof DataTypesTable | undefined {
    return this.filenames().find((name) => name === filename);
  }
  filenames(): (keyof DataTypesTable)[] {
    return [
      "Actors",
      "Classes",
      "Skills",
      "Items",
      "Weapons",
      "Armors",
      "Enemies",
      "Troops",
      "States",
      "Animations",
      "CommonEvents",
      "MapInfos",
    ] as const;
  }
}

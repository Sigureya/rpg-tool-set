import type { IdentifiedItems } from "@sigureya/rpgtypes";

export const filterValidData = <T>(list: IdentifiedItems<T>): T[] => {
  const result: T[] = [];
  for (const element of list) {
    if (element) {
      result.push(element);
    }
  }
  return result;
};

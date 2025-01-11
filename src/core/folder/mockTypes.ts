import { vi } from "vitest";

export const createMockFsLib = () => ({
  access: vi.fn(),
  writeFile: vi.fn(),
  mkdir: vi.fn(),
  readdir: vi.fn(),
  readFile: vi.fn(),
});

export const MockPathLib = {
  resolve: vi.fn(),
  basename: vi.fn(),
};
// export const MockLibs: Libs = {
//   path: {
//     resolve: vi.fn(),
//     basename: vi.fn(),
//   },
//   fileSystem: MockFsLib,
// };

import type { AudioFileParams } from "@sigureya/rpgtypes";

export const createAudio = (): AudioFileParams => {
  return {
    name: "",
    pan: 0,
    pitch: 0,
    volume: 0,
  };
};

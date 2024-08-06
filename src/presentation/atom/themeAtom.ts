import { atom } from "recoil";

export type TThemeAtomProps = string | undefined;

export const themeAtom = atom<TThemeAtomProps>({
  key: "themeAtom",
  default: "",
});

"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSetRecoilState } from "recoil";
import { themeAtom } from "@/presentation/atom/themeAtom";

const DarkModeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  let setThemeAtom = useSetRecoilState(themeAtom);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setThemeAtom(theme);
  }, [setThemeAtom, theme]);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <span className="  flex w-fit items-center  rounded-2xl ">
      <p className="sr-only">Choose your theme</p>

      {currentTheme === "dark" ? (

        <button onClick={() => {
          setTheme("light");
        }}>sun&nbsp;</button>

      ) : (
        <button onClick={() => {
          setTheme("dark");
        }}>moon</button>
      )}
    </span>
  );
};
export default DarkModeBtn;

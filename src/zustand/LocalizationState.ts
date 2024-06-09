import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { en } from "../translation/en";
import { allLanguageValues, languageShort } from "../translation";
import { configureMMKV } from "./ZustandFunctions";
import { ZustandKeys } from "../appstrings";

export type localeType = string;

export type LocalizationStateValuesType = {
  locale: localeType;
  setLanguage: (lang: localeType) => void;
  strings: typeof en;
};

export const localizationState = create(
  persist<LocalizationStateValuesType>(
    (set, get) => {
      const setLanguage = (str: string = languageShort.EN) =>
        set((s) => ({ ...s, locale: str, strings: allLanguageValues?.[str] }));

      return {
        locale: get()?.locale ?? languageShort.EN,
        setLanguage,
        strings: en,
      };
    },
    {
      name: ZustandKeys.localizationState,
      storage: createJSONStorage(
        configureMMKV.bind(this, ZustandKeys.localizationState)
      ),
    }
  )
);

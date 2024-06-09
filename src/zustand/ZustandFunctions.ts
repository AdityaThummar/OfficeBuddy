import { MMKV } from "react-native-mmkv";

export const configureMMKV = (id:string = new Date().getTime().toString()) => {
  const mmkv = new MMKV({ id });
  return {
    getItem: (str: string) => mmkv.getString(str) ?? "",
    setItem: (key: string, val: string) => mmkv.set(key, val?.toString()),
    removeItem: (key: string) => mmkv.delete(key),
  };
};

import { create } from "zustand";

export type LoadingStateValuesType = {
    message:string;
    setMessage:(msg?:string)=>void;
}

export const loadingState = create<LoadingStateValuesType>((set)=>({
    message:"",
    setMessage:(msg)=>set((s)=>({...s,message:msg ?? ""}))
}))
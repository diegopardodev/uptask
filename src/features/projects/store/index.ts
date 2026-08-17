import { create } from "zustand";
import { SelectProject } from "../types";

type Store = {
    open: boolean;
    setOpen: (open: boolean) => void;
    project: SelectProject | null;
    setProject: (project: SelectProject | null) => void;
}

export const useProjectStore = create<Store>((set) => ({
    open: false,
    setOpen: (open) => {
        set({ open })
    },
    project: null,
    setProject: (project) => {
        set({project})
    }
}));
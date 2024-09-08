import { DkgOperator } from "@/lib/types";
import { create } from "zustand";

interface DKGState {
    selectedOperators: DkgOperator[];
    setSelectedOperators: (operators: DkgOperator[]) => void;
}

export const useDKGStore = create<DKGState>((set) => ({
    selectedOperators: [],
    setSelectedOperators: (operators) => set({ selectedOperators: operators }),
}));
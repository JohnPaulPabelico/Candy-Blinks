import { create } from "zustand";

import { createSelectors } from "./createSelectors";

import {
  ICreateCandyMachineStore,
  createCandyMachineStore,
} from "./create-candy_machine.store";

type IStore = ICreateCandyMachineStore;

export const useStoreBase = create<IStore>()((...state) => ({
  ...createCandyMachineStore(...state),
}));

export const useStore = createSelectors(useStoreBase);

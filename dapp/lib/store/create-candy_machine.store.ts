import { StateCreator } from "zustand";

interface IState {
  page: number;
}

const initialState: IState = {
  page: 0,
};

interface IActions {
  setPage: (value: number) => void;
}

export type ICreateCandyMachineStore = IState & IActions;

export const createCandyMachineStore: StateCreator<ICreateCandyMachineStore> = (
  set
) => ({
  setPage: (value) => set(() => ({ page: value })),
  ...initialState,
});

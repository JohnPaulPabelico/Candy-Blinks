interface GuardOption {
  __option: "None" | "Some";
  // Add other potential properties for the guard types here
}

interface Guards {
  [key: string]: GuardOption | undefined;
}

type InputField =
  | "candyMachineId"
  | "title"
  | "label"
  | "iconUrl"
  | "description";

import type { Control, FieldValues, Path } from "react-hook-form";

type OmitUnion = "name" | "value" | "onChange";

export type ControlledFieldProps<T extends FieldValues, D> = Omit<D, OmitUnion> & {
  control: Control<T>;
  name: Path<T>;
};

import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FieldError, FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "../Typography";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectFieldProps = {
  options: SelectOption[];
  name: string;
  label: string;
  required?: boolean;
  errors: FieldErrors;
  fieldRegisterReturn : UseFormRegisterReturn
};

export const SelectField = ({
  options,
  name,
  label,
  errors,
  fieldRegisterReturn,
  required = false,
}: SelectFieldProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={label + name}>{label}</InputLabel>
      <Select
        required={required}
        labelId={label + name}
        id={name}
        label={label}
        // name={name
        error={!!errors[name]}
        {...fieldRegisterReturn}
      >
        {options.map((option: SelectOption) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      {errors[name] && (
        <FormHelperText error >{(errors[name] as FieldError).message
          }</FormHelperText>
      )}
    </FormControl>
  );
};

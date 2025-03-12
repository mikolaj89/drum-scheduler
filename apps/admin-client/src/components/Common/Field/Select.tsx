import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, FieldErrors, Control, FieldError } from "react-hook-form";

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
  control: Control<any>; // Add control from useForm()
};

export const SelectField = ({
  options,
  name,
  label,
  errors,
  control,
  required = false,
}: SelectFieldProps) => {
  return (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel id={`${label}-${name}`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue="" // Ensures controlled behavior
        render={({ field }) => (
          <Select
            {...field}
            required={required}
            labelId={`${label}-${name}`}
            id={name}
            value={field.value || ""} // Ensures it's controlled
            onChange={(event) => field.onChange(event.target.value)} // Update form state
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors[name] && (
        <FormHelperText error>{(errors[name] as FieldError).message}</FormHelperText>
      )}
    </FormControl>
  );
};

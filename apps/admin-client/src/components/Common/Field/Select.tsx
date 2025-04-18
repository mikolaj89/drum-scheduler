import {
  FormControl,
  FormHelperText,
  InputLabel,
  InputLabelPropsSizeOverrides,
  MenuItem,
  Select,
  SxProps,
  Theme,
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
  onSelect?: (val: string) => void;
  size?: "small" | "medium"  ;
  sx?: SxProps<Theme>;
};

export const SelectField = ({
  options,
  name,
  label,
  errors,
  control,
  required = false,
  onSelect = () => {},
  size = "medium",
  sx
}: SelectFieldProps) => {
  return (
    <FormControl error={!!errors[name]}>
      <InputLabel size={size === "small" ? "small" : "normal"} sx={{ backgroundColor: "white" }} id={`${label}-${name}`}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
          sx={{ minWidth: 300, ...sx }}
            {...field}
            size={size}
            required={required}
            labelId={`${label}-${name}`}
            id={name}
            value={field.value || ""}
            onChange={(event) => {
              field.onChange(event.target.value);
              onSelect(event.target.value);
            }}
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
        <FormHelperText error>
          {(errors[name] as FieldError).message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

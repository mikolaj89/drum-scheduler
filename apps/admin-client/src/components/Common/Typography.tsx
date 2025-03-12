import { FormHelperText, styled } from "@mui/material";
import theme from "../Layout/theme";

export const ErrorMessage = styled(FormHelperText)({
  color: theme.palette.error.dark,
});

export const FormError = styled(FormHelperText)({
  fontSize: 14
});


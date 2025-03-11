import { FormHelperText, styled, Typography } from "@mui/material";
import theme from "../Layout/theme";

export const ErrorMessage = styled(FormHelperText)({
  color: theme.palette.error.dark,
});

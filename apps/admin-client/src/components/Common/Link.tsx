import { styled } from "@mui/material/styles";
import NextLink  from "next/link";

export const Link = styled(NextLink)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  transition: "color 0.2s ease-in-out",
  lineHeight: 1.5,
  "&:hover": {
    color: "inherit",
    textDecoration: "underline",
    
  },
}));

export const TableLink = styled(NextLink)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  transition: "color 0.2s ease-in-out",
  textUnderlineOffset: "0.2em",
  "&:hover": {
    color: "inherit",
    textDecoration: "underline",
  },
}));




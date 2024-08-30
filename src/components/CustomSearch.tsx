import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import { alpha, Theme } from "@mui/material/styles";

const StyledInputBase = styled(InputBase)<{ theme?: Theme }>((props) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: props.theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${props.theme.spacing(4)})`,
    transition: props.theme.transitions.create("width"),
    width: "100%",
    [props.theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchIconWrapper = styled("div")<{ theme?: Theme }>((props) => ({
  padding: props.theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")<{ theme?: Theme }>((props) => ({
  position: "relative",
  borderRadius: props.theme.shape.borderRadius,
  backgroundColor: alpha(props.theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(props.theme.palette.common.white, 0.25),
  },
  marginRight: props.theme.spacing(2),
  marginLeft: props.theme.spacing(3),
  width: "0",
  display: "none", // Initially hidden
  [props.theme.breakpoints.up("sm")]: {
    display: "flex", // Show on sm and larger screens
    marginLeft: props.theme.spacing(3),
    width: "auto",
  },
}));

export { StyledInputBase, SearchIconWrapper, Search };

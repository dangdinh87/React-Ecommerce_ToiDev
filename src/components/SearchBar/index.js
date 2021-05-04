import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { SearchRounded } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    width: "100%",
    display: "flex",
    flexFlow: "flex nowrap",
    // width: "100%",
    // position: "relative",

    // marginLeft: 0,
    flex: 1,
    // flexFlow: " row nowrap",
  },
  searchIcon: {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,

    flex: 1,
    padding: theme.spacing(1),
    height: "100%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
  },
  inputRoot: {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    flex: 9,
    color: "inherit",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create("width"),

    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  // sectionDesktop: {
  //   display: "none",
  //   [theme.breakpoints.up("md")]: {
  //     display: "flex",
  //   },
  // },
  // sectionMobile: {
  //   display: "flex",
  //   [theme.breakpoints.up("md")]: {
  //     display: "none",
  //   },
  // },
}));

function SearchBar() {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Tìm kiếm"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
      <div className={classes.searchIcon}>
        <SearchRounded />
      </div>
    </div>
  );
}

export default SearchBar;

import {
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { SearchRounded } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import queryString from "query-string";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";

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
    flex: 1,
    position: "relative",
    zIndex: 999,
  },
  searchIcon: {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    width: 80,
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
    flex: 1,
    color: "inherit",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  inputInput: {
    flex: 1,
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
  toggleSearch: {
    // marginTop: 2,
    position: "absolute",
    background: theme.palette.background.paper,
    width: `calc(100% - 80px)`,
    // borderTop: `2px solid ${theme.palette.success}`,
    top: "100%",
    zIndex: 99,
    padding: 0,
    boxShadow: theme.shadows[5],
  },
  labelSearch: {
    margin: theme.spacing(0.5, 0, 0.5, 2),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    background: theme.palette.background.paper,
  },
  textSearch: {
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(-2),
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

function SearchBar({ onChange = null, onShowOverlay }) {
  const [listHistory, setListHistory] = useState([]);
  const [value, setValue] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const history = useHistory();

  const handleDeleteSearch = (item) => {
    setShowHistory(true);
    const newListHistory = [...listHistory];
    if (newListHistory.includes(item)) {
      newListHistory.splice(listHistory.indexOf(item), 1);
      localStorage.setItem("history_search", JSON.stringify(newListHistory));
      setListHistory(newListHistory);
    }
  };

  const handleFocusSearch = () => {
    const listHistorySearch =
      JSON.parse(localStorage.getItem("history_search")) || [];
    setListHistory(listHistorySearch);
    setShowHistory(true);
    onShowOverlay((x) => !x);
  };

  const handleSearch = useCallback((valueSearch) => {
    setShowHistory(false);

    const listHistorySearch =
      JSON.parse(localStorage.getItem("history_search")) || [];

    let filters = "";
    valueSearch === null || valueSearch === ""
      ? (filters = {})
      : (filters = { name_contains: valueSearch });
    history.push({
      pathname: "/products",
      search: queryString.stringify(filters),
    });
    // if (
    //   document.documentElement.scrollHeight >
    //   document.documentElement.clientHeight + 200
    // )
    //   window.scroll(0, 300);
    if (valueSearch === null || valueSearch === "") return;
    const newList = [...listHistorySearch];
    if (listHistorySearch.includes(valueSearch))
      newList.splice(newList.indexOf(valueSearch), 1);
    newList.push(valueSearch);
    localStorage.setItem("history_search", JSON.stringify(newList));
  }, []);

  const handleBlurSearch = (value) => {
    // if (showHistory === true) return;
    setShowHistory(false);
    onShowOverlay((x) => !x);
  };

  const handleReSearch = (newValue) => {
    setShowHistory(true);
    const newList = [...listHistory];
    if (listHistory.includes(newValue))
      newList.splice(newList.indexOf(newValue), 1);
    newList.push(newValue);
    localStorage.setItem("history_search", JSON.stringify(newList));
    history.push({
      pathname: "/products",
      search: queryString.stringify({ name_contains: newValue }),
    });
    setValue(newValue);
    setShowHistory(false);
  };

  const handleChangeValue = useCallback((newValue) => {
    setValue(newValue);
    const localStoredHistory =
      JSON.parse(localStorage.getItem("history_search")) || [];
    setListHistory(
      localStoredHistory.filter((x) => x.toLowerCase().indexOf(newValue) !== -1)
    );
  }, []);

  const classes = useStyles();
  console.log("!");
  return (
    <div className={classes.search}>
      <InputBase
        value={value}
        autoComplete="off"
        onFocus={handleFocusSearch}
        onBlur={handleBlurSearch}
        onChange={(e) => handleChangeValue(e.target.value)}
        name="name_contains"
        placeholder="Tìm kiếm sản phẩm"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        // onSubmit={() => handleSearch(value)}
      />
      {!!showHistory && listHistory?.length > 0 && (
        <Fade in timeout={300}>
          <List
            component="nav"
            disablePadding={true}
            className={classes.toggleSearch}
            // classes={{ padding: 0 }}
          >
            <Typography component="h6" className={classes.labelSearch}>
              Lịch sử tìm kiếm
            </Typography>
            <Divider />
            {listHistory
              .slice(-5)
              .reverse()
              .map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    dense
                    button
                    onMouseDown={() => handleReSearch(item)}
                    onClick={() => handleReSearch(item)}
                  >
                    <ListItemIcon>
                      <SearchIcon />
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.textSearch,
                      }}
                      primary={item}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Xóa">
                        <IconButton edge="end" aria-label="delete">
                          <CloseIcon
                            fontSize="small"
                            onMouseDown={() => handleDeleteSearch(item)}
                            onClick={() => handleDeleteSearch(item)}
                          />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>

                  {/* <Divider /> */}
                </React.Fragment>
              ))}
          </List>
        </Fade>
      )}
      <div className={classes.searchIcon} onClick={() => handleSearch(value)}>
        <SearchRounded />
      </div>
    </div>
  );
}

export default SearchBar;

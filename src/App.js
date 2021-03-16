import Button from "@material-ui/core/Button";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { theme } from "./theme/themes";
// import Button from "../src/components/atoms/Button";
const useStyles = makeStyles((theme) => ({
  // root: {
  //   color: theme.status.danger,
  //   "&$checked": {
  //     color: theme.status.danger,
  //   },
  // },
  // checked: {},
}));

function CustomCheckbox() {
  const classes = useStyles();

  return (
    <>
      <Button color="secondary" children="pro" variant="contained" />
      <Button color="primary" children="pro" variant="contained" />
    </>
  );
}

// const theme = createMuiTheme({
//   status: {
//     danger: orange[500],
//   },
// });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomCheckbox />
    </ThemeProvider>
  );
}

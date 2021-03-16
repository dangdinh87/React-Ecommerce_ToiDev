import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#c54646",
      light: " #b18080",
      dark: "#bb1e1e",
    },
    secondary: {
      main: "#5de60e",
      dark: "#099136",
      light: "#c1eca3",
    },
  },
  typography: {
    fontFamily: "Comic Sans MS",
    body2: {
      fontFamily: "Times New Roman",
      fontSize: "1rem",
    },
  },
});

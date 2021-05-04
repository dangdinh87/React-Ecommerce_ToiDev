import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { default as React } from "react";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import routers from "./routers";
import { themeConfig } from "./theme/themes";

export default function App(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  }
  const isDarkMode = useSelector((state) => state.system.isDarkMode);
  const theme = themeConfig({ isDarkMode });
  const showRouter = (routes) => {
    let result = routes.map((route, index) => {
      return (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.main}
          key={index}
        />
      );
    });
    return <Switch>{result}</Switch>;
  };
  return (
    <Router>
      <ToastContainer position="top-right" />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {showRouter(routers)}
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </ThemeProvider>
      <MessengerCustomerChat
        pageId="105397381600674"
        appId="895141634660146"
        // htmlRef="<REF_STRING>"
      />
    </Router>
  );
}

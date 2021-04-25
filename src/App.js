import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessengerCustomerChat from "react-messenger-customer-chat";
import Header from "./components/Header";
import routers from "./routers";
import { themeConfig } from "./theme/themes";

export default function App() {
  // const dispatch = useDispatch();
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // console.log(prefersDarkMode, "media");
  // useEffect(() => {
  //   dispatch(toggleDarkMode(prefersDarkMode));
  // }, [prefersDarkMode]);
  const isDarkMode = useSelector((state) => state.system.isDarkMode);
  console.log(isDarkMode);
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
      </ThemeProvider>
      <MessengerCustomerChat
        pageId="105397381600674"
        appId="895141634660146"
        // htmlRef="<REF_STRING>"
      />
    </Router>
  );
}
